import * as _ from "lodash";
import * as React from "react";
import pnp, { SearchQuery, SearchResults } from "sp-pnp-js";
import DisplayProp from "../../shared/DisplayProp";
//import styles from "./PropertyBagFilteredSiteList.module.scss";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { Label } from "office-ui-fabric-react/lib/Label";
import MessageDisplay, * as md from "../../shared/MessageDisplay";
import utils from "../../shared/utils";
import { IPropertyBagFilteredSiteListProps } from "./IPropertyBagFilteredSiteListProps";

import { IContextualMenuItem, } from "office-ui-fabric-react/lib/ContextualMenu";
export interface IPropertyBagFilteredSiteListState {
  errorMessages: Array<md.Message>;
  sites: Array<Site>;
  filteredSites: Array<Site>;
  userFilters: Array<UserFilter>;// this is what the user CAN filter on
  appliedUserFilters: Array<AppliedUserFilter>;// this is what the user HAS filtered on
}
export class Site {
  public constructor(
    public title: string,
    public description: string,
    public url: string,

  ) { }
}

export class DisplaySite {
  constructor(
    public Title: string,
    public Url: string,
    public SiteTemplate: string,
    public errorMessages: Array<md.Message>,
    public DisplayProps?: Array<DisplayProp>,
    public searchableProps?: Array<string>,
    public forceCrawl?: boolean,


  ) { }
}
export class AppliedUserFilter {
  /**
   * Creates an instance of AppliedUserFilter.
   * An AppliedUserFilter is created when a user oerforms a filtering operation
   * @param {string} managedPropertyName  The property the user filtered on
   * @param {string} value The value the user selected for the filter
   * 
   * @memberOf AppliedUserFilter
   */
  public constructor(
    public managedPropertyName: string,
    public value: string) { }
}
export class UserFilter {

  /**
   * A UserFilter lets the use filter the list of displayed sites based on a metadata value.
   * The ManagedProperty name is displayed in a CommandBar as a dropdown, with the values as 
   * dropdown options.
   * 
   * @type {Array<string>}
   * @memberOf UserFilter
   */
  public values: Array<string>;
  public constructor(public managedPropertyName: string) {
    this.values = [];
  }
}
export default class PropertyBagFilteredSiteList extends React.Component<IPropertyBagFilteredSiteListProps, IPropertyBagFilteredSiteListState> {
  public constructor(props) {

    super(props);
    this.state = { sites: [], filteredSites: [], errorMessages: [], userFilters: [], appliedUserFilters: [] };
  }
  /** Utility Functions */
  /**
   * Removes a message from the MessageDisplay
   * 
   * @param {string} messageId the ID of the message to remove
   * 
   * @memberOf PropertyBagFilteredSiteList
   */
  public removeMessage(messageId: string) {
    // _.remove(this.state.errorMessages, {
    //   Id: messageId
    // });
    // this.setState(this.state);
    const messages = this.state.errorMessages;
    _.remove(messages, {
      Id: messageId
    });
    this.setState((current) => ({ ...current, errorMessages: messages }));
  }

  /**
   * Initializes the list of user filters.
   * A user filter is created for each UserFilter name specified in the props.
   * 
   * @param {Array<string>} userFilterNames 
   * 
   * @memberOf PropertyBagFilteredSiteList
   */
  public setupUserFilters(userFilterNames: Array<string>): void {
    console.log("in extractUserFilterValues");
    // this.state.userFilters = [];
    // for (const userFilterName of userFilterNames) {
    //   this.state.userFilters.push(new UserFilter(userFilterName));
    // }
    let userFilters = [];
    for (const userFilterName of userFilterNames) {
      userFilters.push(new UserFilter(userFilterName));
    }
    this.setState((current) => ({ ...current, userFilters: userFilters }));

  }

  /**
   * Adds values to All the UserFilters for a given SearchResults.
   * 
   * @param {any} r The Searchresult
   * 
   * @memberOf PropertyBagFilteredSiteList
   */
  public extractUserFilterValues(r): void {

    for (const userFilter of this.state.userFilters) {
      const value = r[userFilter.managedPropertyName].trim();
      if (_.find(userFilter.values, v => { return v === value; })) {
        // already there
      }
      else {
        userFilter.values.push(value);
      }
    }

  }
  /**
   * Gets the sites to be displayed in the list using the filters passed in from Properies
   * Sites are saved in  this.state.sites
   * @param {Array<string>} siteTemplatesToInclude  Site templats (i.e. STS of STS#0, etc,)
   * @param {Array<string>} filters Filters to use from PropertyPane
   * @param {boolean} showQueryText Whether to display the queryText in the MessageDisplay
   * @param {Array<string>} userFilters the list of user filters to be built from the searchresults
   * @param {boolean} showSiteDescriptions Include site descroptions in search results
   * 
   * @memberOf PropertyBagFilteredSiteList
   */
  public getSites(siteTemplatesToInclude: Array<string>, filters: Array<string>, showQueryText: boolean, userFilters: Array<string>, showSiteDescriptions: boolean): void {

    const userFilterNameArray = [];
    if (userFilters) {
      for (const userFilter of userFilters) {

        userFilterNameArray.push(userFilter);

      }
    }
    let querytext = "contentclass:STS_Site ";
    if (siteTemplatesToInclude) {
      querytext = utils.addSiteTemplatesToSearchQuery(siteTemplatesToInclude, querytext);
    }
    if (filters) {
      querytext = utils.addFiltersToSearchQuery(filters, querytext);
    }
    if (showQueryText) {
      this.state.errorMessages.push(new md.Message("Using Query " + querytext));
    }
    const selectProperties: Array<string> = ["Title", "SPSiteUrl"];

    if (showSiteDescriptions) {
      selectProperties.push("Description");
    }
    for (const userFilter of userFilterNameArray) {
      selectProperties.push(userFilter);
    }

    const q: SearchQuery = {
      Querytext: querytext,
      SelectProperties: selectProperties,
      RowLimit: 999,
      TrimDuplicates: false,
      // SortList:
      // [
      //   {
      //     Property: 'Title',
      //     Direction: SortDirection.Ascending
      //   }
      // ]

    };
    pnp.sp.search(q).then((results: SearchResults) => {
      // this.state.sites = [];
      // debugger;
      // this.setupUserFilters(userFilterNameArray);
      // for (const r of results.PrimarySearchResults) {
      //   const index = this.state.sites.push(new Site(r.Title, r.Description, r.SPSiteUrl));

      //   for (const mp of this.props.userFilters) {
      //     this.state.sites[index-1][mp] = r[mp];
      //   }
      //   this.extractUserFilterValues(r);
      // }
      // this.filterSites();
      // this.setState(this.state);
      let sites = [];
      debugger;
      this.setupUserFilters(userFilterNameArray);
      for (const r of results.PrimarySearchResults) {
        debugger;
        const index = sites.push(new Site(r.Title, r.Description, r["SPSiteUrl"]));

        for (const mp of this.props.userFilters) {
          sites[index - 1][mp] = r[mp];
        }
        this.extractUserFilterValues(r);
      }
      debugger;
      let filteredSites = this.filterSites(sites);// need to pass sites iun here and return the filtered array!!!
      this.setState((current) => ({ ...current, filteredSites: filteredSites, sites: sites }));
    }).catch(err => {
      debugger;
      this.state.errorMessages.push(new md.Message(err));
      this.setState(this.state);
    });
  }
  /** react lifecycle */
  /**
   * Called whe component loads.
   * Gets the sites and builds the userFilters
   * 
   * @memberOf PropertyBagFilteredSiteList
   */
  public componentDidMount() {

    this.getSites(this.props.siteTemplatesToInclude, this.props.filters, this.props.showQueryText, this.props.userFilters, this.props.showSiteDescriptions);
  }
  /**
   * Called whe Properties are changed in the PropertyPane
   * Gets the sites and builds the userFilters using the new Properties
   * 
   * 
   * @param {IPropertyBagFilteredSiteListProps} nextProps 
   * @param {*} nextContext 
   * 
   * @memberOf PropertyBagFilteredSiteList
   */
  public componentDidUpdate(nextProps: IPropertyBagFilteredSiteListProps, nextContext: any): void {
    debugger;
    this.getSites(nextProps.siteTemplatesToInclude, nextProps.filters, nextProps.showQueryText, nextProps.userFilters, nextProps.showSiteDescriptions);
  }
  /**
   * Called by the Render method.
   * Displayes the Site Description if requested in the PropertyPane.
   * Otherwise displays an empty Div
   * 
   * @param {Site} site 
   * @returns 
   * 
   * @memberOf PropertyBagFilteredSiteList
   */
  public conditionallyRenderDescription(site: Site): JSX.Element {
    if (this.props.showSiteDescriptions) {
      return (<Label>{site.description}</Label>);
    }
    else {
      return (<div />);
    }
  }
  /**
   * Called by the Render Method
   * Sets up the ContentualMenuItems based on the FilterData extracted from the SearchResults
   * 
   * @private
   * @returns {Array<IContextualMenuItem>} 
   * 
   * @memberOf PropertyBagFilteredSiteList
   */
  private SetupFilters(): Array<IContextualMenuItem> {

    const items = new Array<IContextualMenuItem>();
    for (const uf of this.state.userFilters) {
      const item: IContextualMenuItem = {
        key: uf.managedPropertyName,
        name: uf.managedPropertyName,
        title: uf.managedPropertyName,
        href: null,

      }
      item.subMenuProps = { items: [] };
      for (const value of uf.values) {
        item.subMenuProps.items.push({
          key: value,
          data: {
            managedPropertyName: uf.managedPropertyName,
            value: value
          },
          checked: this.AppliedFilterExists(uf.managedPropertyName, value),
          name: value,
          title: value,
          onClick: this.filterOnMetadata.bind(this)
        });
      }
      items.push(item);
    }
    return items;
  }
  /**
   *  Determines if the specified managedProperty and value are currently being filtered on
   * 
   * @param {string} managedPropertyName 
   * @param {string} value 
   * @returns {boolean} 
   * 
   * @memberOf PropertyBagFilteredSiteList
   */
  public AppliedFilterExists(managedPropertyName: string, value: string): boolean {
    const selectedFilter = _.find(this.state.appliedUserFilters, af => {
      return (af.managedPropertyName === managedPropertyName && af.value === value);
    });
    if (selectedFilter) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Togles the userFIlter fpr the managedProperty and value in the specified MenuItem
   * 
   * @param {IContextualMenuItem} item 
   * 
   * @memberOf PropertyBagFilteredSiteList
   */
  public ToggleAppliedUserFilter(item: IContextualMenuItem): void {
    if (this.AppliedFilterExists(item.data.managedPropertyName, item.data.value)) {
      // this.state.appliedUserFilters = this.state.appliedUserFilters.filter(af => {
      //   return (af.managedPropertyName !== item.data.managedPropertyName || af.value !== item.data.value);
      // });
      this.setState((current) => ({
        ...current,
        appliedUserFilters: current.appliedUserFilters.filter(af => {
          return (af.managedPropertyName !== item.data.managedPropertyName || af.value !== item.data.value);
        })

      }))
    }
    else {
      // this.state.appliedUserFilters.push(new AppliedUserFilter(item.data.managedPropertyName, item.data.value));
      let temp = this.state.appliedUserFilters;
      temp.push(new AppliedUserFilter(item.data.managedPropertyName, item.data.value));
      this.setState((current) => ({ ...current, appliedUserFilters: temp }))
    }

  }
  /**
   * Filters the sites in this.state.sites using the userFilteres in this.state.appliedUserFilters
   * and stores it in this.state.filteredSites.
   * this.state.sites holds all sites after filtering based on propertypane filters.
   * this.state.filteredSites hods the likst of sites after userFilters are applied and
   * is shown in the display
   * 
   * @memberOf PropertyBagFilteredSiteList
   */
  public filterSites(sites: Site[]): Site[] {
    if (this.state.appliedUserFilters.length === 0) {
      return sites;
    }
    else {

      const filteredSites = sites.filter(site => {
        debugger;
        for (const auf of this.state.appliedUserFilters) {
          if (site[auf.managedPropertyName] === auf.value) {
            return true;
          }
        }
        return false;

      });
      return filteredSites;
    }
  }
  /**
   * EventHandler called when a user selects one of the filters from the COmmandBar
   * Toggles the filter
   * Applies the new Filters.
   * re-deiplays the list
   * 
   * @param {React.MouseEvent<HTMLElement>} [ev] 
   * @param {IContextualMenuItem} [item] 
   * 
   * @memberOf PropertyBagFilteredSiteList
   */
  public filterOnMetadata(ev?: React.MouseEvent<HTMLElement>, item?: IContextualMenuItem) {
    this.ToggleAppliedUserFilter(item);
    // this.filterSites();
    // this.setState(this.state);
    this.setState((current) => ({ ...current, filteredSites: this.filterSites(current.sites) }));
  }

  public doNothing(ev?: React.MouseEvent<HTMLElement>, item?: IContextualMenuItem) {
    ev.stopPropagation();
    return false;

  }

  /**
   * Renders the list of sites in this.state.filteredSites.
   * 
   * @returns {React.ReactElement<IPropertyBagFilteredSiteListProps>} 
   * 
   * @memberOf PropertyBagFilteredSiteList
   */
  public render(): React.ReactElement<IPropertyBagFilteredSiteListProps> {

    debugger;
    const listItems = this.state.filteredSites.map((site) =>
      <li >
        <a href={site.url} target={this.props.linkTarget}>{site.title}</a>
        {this.conditionallyRenderDescription(site)}
      </li>
    );
    const commandItems: Array<IContextualMenuItem> = this.SetupFilters();

    return (
      <div >
        <Label>{this.props.description}</Label>
        <Label>Sites:{this.state.sites.length}</Label>
        <Label>FoltererdSites:{this.state.filteredSites.length}</Label>
        <CommandBar items={commandItems} />
        <MessageDisplay
          messages={this.state.errorMessages}
          hideMessage={this.removeMessage.bind(this)}
        />
        <ul > {listItems}</ul>
        {/*<List items={sites} startIndex={0} 
          onRenderCell={(site, index) => {
        
            return (
              <div >
                <Link href={site.url}>{site.title}</Link>
                <Label>{site.description}</Label>
              </div>
            );
          }}
        >
        </List>*/}

      </div >
    );
  }
}
