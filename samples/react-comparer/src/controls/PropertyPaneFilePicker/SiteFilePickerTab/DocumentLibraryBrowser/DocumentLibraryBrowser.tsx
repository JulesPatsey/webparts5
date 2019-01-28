import * as React from 'react';
import styles from './DocumentLibraryBrowser.module.scss';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { css } from "@uifabric/utilities/lib/css";
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';

import { IDocumentLibraryBrowserProps, IDocumentLibraryBrowserState, ILibrary } from './DocumentLibraryBrowser.types';
import * as strings from 'PropertyPaneFilePickerStrings';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export default class DocumentLibraryBrowser extends React.Component<IDocumentLibraryBrowserProps, IDocumentLibraryBrowserState> {
  constructor(props: IDocumentLibraryBrowserProps) {
    super(props);

    this.state = {
      isLoading: true,
      lists: []
    };
  }

  public componentDidMount(): void {

    const { absoluteUrl } = this.props.context.pageContext.web;

    const apiUrl: string = `${absoluteUrl}/_api/SP.Web.GetDocumentAndMediaLibraries?webFullUrl=%27${encodeURIComponent(absoluteUrl)}%27&includePageLibraries=%27false%27`;
    this.props.context.spHttpClient.get(apiUrl,
      SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        response.json().then((responseJSON: any) => {
          const lists: ILibrary[] = responseJSON.value.map((item) => {
            const list: ILibrary = {
              title: item.Title,
              absoluteUrl: item.AbsoluteUrl,
              serverRelativeUrl: item.ServerRelativeUrl
            };
            return list;
          });
          this.setState({
                lists: lists,
                isLoading: false
              });
        });
      });
  }

  public render(): React.ReactElement<IDocumentLibraryBrowserProps> {
    if (this.state.isLoading) {
      return (<Spinner label={strings.Loading} />);
    }
    return (
      <FocusZone>
        <List
          className={styles.folderList}
          items={this.state.lists}
          onRenderCell={this._onRenderCell}
        />
      </FocusZone>
    );
  }

  private _onRenderCell = (item: ILibrary, index: number | undefined): JSX.Element => {
    return (
      <div
        className={styles.listCell}
        data-is-focusable={true}
      >
        <div className={styles.cell}>
          <div className={styles.cellContent}>
            <a className={styles.link} onClick={(_event) => this._handleOpenLibrary(item)} >
              <span className={styles.aboveNameplate}>
                <span className={styles.content}>
                  <div className={css(styles.folderCover, styles.isLarge)}>
                    <img src="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/foldericons/folder-large_backplate.svg" className={styles.folderCoverBack}></img>
                    <img src={"https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/foldericons/folder-large_frontplate_nopreview.svg"} className={styles.folderCoverFront} />
                  </div>
                </span>
              </span>
              <span className={styles.namePlate}><span className={styles.name}>{item.title}</span></span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  private _handleOpenLibrary = (library: ILibrary) => {
    this.props.onOpenLibrary(library);
  }
}
