import * as React from "react";
import { css } from "office-ui-fabric-react";
var Coverflow = require('reactjs-coverflow');
import { IVideoLibraryCpverFlowWebPartProps } from "../IVideoLibraryCpverFlowWebPartProps";
import { Video } from "../../O365VUtilities";
export interface IVideoLibraryCpverFlowProps extends IVideoLibraryCpverFlowWebPartProps {

}
export interface IVideoLibraryState {
  ease: string;
  width: number;
  playerUrlTemplate: string;
  videos: Array<Video>;
  selectedVideo: number;

}

export default class VideoLibrary extends React.Component<IVideoLibraryCpverFlowProps, IVideoLibraryState> {

  constructor(props: IVideoLibraryCpverFlowProps) {
    super(props);
    this.afterChange = this.afterChange.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.state = {
      ease: "linear",
      width: 400,
      playerUrlTemplate: null,
      videos: [],
      selectedVideo: -1,
    };
  }
  public componentWillMount(nextProps) {
    // Load new data when the dataSource property changes.
    this.props.o365Video.Initialize().then((settings) => {
      debugger;
      //      this.state.playerUrlTemplate = settings.PlayerUrlTemplate; // this url does not work. You neeed the channel
      this.state.playerUrlTemplate = settings.VideoPortalLayoutsUrl + "/VideoEmbedHost.aspx?chId={0}&vId={1}&width=640&height=360&autoPlay=true&showInfo=true";
      if (this.props.videoChannel) {
        this.props.o365Video.GetVideos(this.props.videoChannel).then((videos) => {
          this.state.videos = videos;
          this.setState(this.state);
        });
      }
    });

  }
  public afterChange(slideNumber: number) {
    this.state.selectedVideo = -1;
    this.setState(this.state);
  }
  public playVideo(event) {
    debugger;
    this.state.selectedVideo = parseInt(event.target.dataset.videonumber);
    this.setState(this.state);
  }
  public previous(e) {
    e.preventDefault();
    const cf = this.refs["coverflow"] as any;
    cf.previous();

  }
  public next(e) {
    e.preventDefault();
    const cf = this.refs["coverflow"] as any;
    cf.next();
  }
  public render(): JSX.Element {
    if (this.state.videos.length === 0) {
      return (<div />);
    }
    return (
      <div>
        <div >
          <Coverflow style={{ width: this.props.coverflowWidth+"px", height: this.props.coverflowHeight + "px" }} ref="coverflow"
            margin={this.props.coverflowMargin + "px"}
            startPosition={this.props.coverflowStartPosition}
            enableScroll={this.props.coverflowEnableScroll}
            animationSpeed={this.props.coverflowAnimationSpeed}>

            {this.state.videos.map((v, i, a) => {

              if (i === this.state.selectedVideo) {
                const src = this.state.playerUrlTemplate.replace("{1}", v.ID).replace("{0}", v.ChannelID);
                return (<iframe src={src} style={{ height: this.props.iframeHeight + "px", width: this.props.iframeWidth + "px" }} />);
              }
              else {
                return (<img className="reactjs-coverflow_cover" src={v.ThumbnailUrl} data-videonumber={i} style={{ height: this.props.imgHeight+ "px", width: this.props.imgWidth + "px" }} onClick={this.playVideo} />);
              }
            })}
          </Coverflow>
          <div class="reactjs-coverflow_actions" data-radium="true" >
            <button type="button" class="reactjs-coverflow_button" onClick={this.previous}>Previous</button>
            <button type="button" class="reactjs-coverflow_button" onClick={this.next}>Next</button></div>
        </div>
      </div>
    );
  }
}
