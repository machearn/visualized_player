import React, { createRef } from "react";
import MusicContext from '../utils/MusicContext'
import style from './player.module.scss'
import Line from "./line";

// create a context
export const MusicVisualizerContext = new MusicContext();
// Player commponent
export default class Player extends React.Component {
    componentDidMount() {
        MusicVisualizerContext.setAudioElement(this.audio.current.audio.current); // associate audio as the source of context
    }

    constructor() {
        super()
        // refs
        audio=createRef()
        hiddenFileInput=createRef()
        this.lastTime=0
        this.raf = 0
        this.state={musicName:'Please load a music...',audioUrl:'',audioData:[],isPlaying:false}
    }

    step=(timestamp)=> {
        if (!this.lastTime) this.lastTime = timestamp
        const progress  = timestamp - this.lastTime
        if (progress === 0 || progress > 0) {
            this.setState({audioData:[...MusicVisualizerContext.getFrequencyData()]}) //transfer frequency data
            this.lastTime = timestamp
        }
        this.raf = requestAnimationFrame(step)
    }
    
    play=()=>{
        this.setState({isPlaying:true}) //change playing states
        raf=requestAnimationFrame(step)
    }

    pause=()=>{
        this.setState({isPlaying:false}) //change playing states
        raf && cancelAnimationFrame(raf)
    }

    chooseLocalMusic=()=>{
        this.hiddenFileInput.current.click()
    }

    handleFileChange=(e)=>{
        const file=e.target.files[0]
        const url=URL.createObjectURL(file)
        this.setState({musicName:file.name,audioUrl:url})
    }

    render(){
        return (
            <div>
                <main className={style.page}>
                    <div className={style.operationWrapper}>
                        <button className="btn m10" onClick={this.chooseLocalMusic}>Choose a local music</button>
                        <div className="strong-text m10" style={{minWidth: '200px'}}>{musicName}</div>
                        <input type="file" style={{display: 'none'}} ref={hiddenFileInput} onChange={this.handleFileChange} />
                    </div>
                    <div className={style.audioWrapper}>
                        <audio controls onPlay={this.play} onPause={this.pause} ref={audio} src={this.state.audioUrl} crossOrigin="anonymous"></audio>
                    </div>
                    <div className={style.exampleWrapper}>
                        <SLine isPlaying={this.state.isPlaying} data={this.state.audioData} />
                    </div>
                </main>
            </div>
        );
    }
}