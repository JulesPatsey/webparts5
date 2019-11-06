import { sp, Web, AppCatalog, Site } from "@pnp/sp";


export class SiteCollectionCatalogHelper {


  public static async  getSiteCollectionCatalogList(): Promise<SiteCatalogApps[]> {

    let resultData = new Array<SiteCatalogApps>();

    var tenantAppCatalogWeb = await sp.getTenantAppCatalogWeb();

    //let siteCollectionAppCatalogs = await tenantAppCatalogWeb.getList("/sites/appcatalog/Lists/SiteCollectionAppCatalogs").items.get();
    let siteCollectionAppCatalogs = await tenantAppCatalogWeb.lists.getByTitle("Site Collection App Catalogs").items.get();

    let data = await Promise.all(siteCollectionAppCatalogs.map(async siteCollCatalog => {

      let siteUrl = siteCollCatalog["SiteCollectionUrl"];

      let tmpSite = new Site(siteUrl);
      let tmpCatalog = await tmpSite.rootWeb.getSiteCollectionAppCatalog(siteUrl);
      let apps = await tmpCatalog.get();

      let tmpWeb = (await (await tmpSite.getRootWeb()).select("Title").get());


      if (apps.length == 0) {
        let tmpApp = new SiteCatalogApps();
        tmpApp.SiteTitle = tmpWeb["Title"];
        tmpApp.SiteURL = siteUrl;
        tmpApp.AppTitle = "There are no apps Available ";
        resultData.push(tmpApp);
      } else {
        apps.forEach(app =>{
          let tmpApp = new SiteCatalogApps();
          tmpApp.SiteTitle = tmpWeb["Title"];
          tmpApp.SiteURL = siteUrl;
          tmpApp.AppTitle = app["Title"];
          tmpApp.AppCatalogVersion = app["AppCatalogVersion"];
          tmpApp.Deployed = String(app["Deployed"]);
          tmpApp.InstalledVersion = app["InstalledVersion"];
          tmpApp.IsEnabled = String(app["IsEnabled"]);
          tmpApp.IsClientSideSolution = String(app["IsClientSideSolution"]);
          resultData.push(tmpApp);
        });
      }
    }));

    return await resultData;
  }
}

export class SiteCatalogApps {
  public SiteTitle: string;
  public SiteURL: string;
  public AppTitle: string;
  public AppCatalogVersion: string;
  public Deployed: string;
  public InstalledVersion: string;
  public IsEnabled: string;
  public IsClientSideSolution: string;
}

