import * as React from 'react';
import { Resizable } from 'on-el-resize/lib/components';
import { IFacebookPageProps } from './IFacebookPageProps';
import styles from './FacebookPage.module.scss';

export default class FacebookPage extends React.Component<IFacebookPageProps, {}> {

  public render() {
    return (
      <Resizable
        className={styles.facebookPageContainer}
        render={({ width }) => {
          return (
            <iframe
              src={this.buildIFrameUrl(width)}
              width={width}
              height={this.props.height || 500}
              style={{
                border: 'none',
                overflow: 'hidden',
                width: '100%'
              }}
              scrolling='no'
              allowTransparency={true}
            />
          );
        }}
      />
    );
  }

  private buildIFrameUrl(width: number): string {
    return `https://www.facebook.com/plugins/page.php?` +
      `href=${encodeURIComponent(this.props.href || 'https://www.facebook.com/Microsoft')}&` +
      `tabs=timeline&` +
      `width=${width}&` +
      `height=${this.props.height || 500}&` +
      `small_header=${typeof this.props.smallHeader !== 'undefined' ? this.props.smallHeader : false}&` +
      `adapt_container_width=true&` +
      `hide_cover=${typeof this.props.hideCover !== 'undefined' ? this.props.hideCover : false}&` +
      `show_facepile=${typeof this.props.hideFacepile !== 'undefined' ? this.props.hideFacepile : true}` +
      `&appId`;
  }

}
