import React, { createRef } from "react";
import MusicContext from '../utils/MusicContext'
import style from './player.module.scss'
import Line from "./line";
import UrlList from "./list";
import AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import Button from '@mui/material/Button';

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
        this.audio = createRef()
        this.hiddenFileInput = createRef()
        this.lastTime = 0
        this.raf = 0
        this.state = {
            urlIndex: 0,
            audioData: [],
            isPlaying: false,
            audioUrlList: [],
            audioNameList: []
        }
    }

    step = (timestamp) => {
        if (!this.lastTime) this.lastTime = timestamp
        const progress = timestamp - this.lastTime
        if (progress === 0 || progress > 0) {
            this.setState({ audioData: [...MusicVisualizerContext.getFrequencyData()] }) //transfer frequency data
            this.lastTime = timestamp
        }
        this.raf = requestAnimationFrame(this.step)
    }

    play = () => {
        this.setState({ isPlaying: true }) //change playing states
        this.raf = requestAnimationFrame(this.step)
    }

    next = () => {
        this.setState({ urlIndex: (this.state.urlIndex + 1) % this.state.audioUrlList.length })
    }

    prev = () => {
        this.setState({ urlIndex: (this.state.urlIndex - 1 + this.state.audioUrlList.length) % this.state.audioUrlList.length })
    }

    pause = () => {
        this.setState({ isPlaying: false }) //change playing states
        this.raf && cancelAnimationFrame(this.raf)
    }

    chooseLocalMusic = () => {
        this.hiddenFileInput.current.click()
    }

    handleFileChange = (e) => {
        const files = e.target.files
        const urls = Array.from(files).map(file => URL.createObjectURL(file))
        const names = Array.from(files).map(file => file.name)
        this.setState({ audioUrlList: urls })
        this.setState({ audioNameList: names })
    }

    handleChooseUrl = (index) => {
        this.setState({ urlIndex: index })
    }

    render() {
        return (
            <div>
                <main className={style.page}>
                    <div className={style.exampleWrapper}>
                        <Line isPlaying={this.state.isPlaying} data={this.state.audioData} />
                    </div>
                    <div className={style.audioWrapper}>
                        <AudioPlayer showSkipControls style={{ margin: "auto", width: "33%" }} onPlay={this.play} onPause={this.pause} onClickNext={this.next} onClickPrevious={this.prev} ref={this.audio} src={this.state.audioUrlList[this.state.urlIndex]} crossOrigin="anonymous" />
                    </div>
                    <div className={style.operationWrapper}>
                        <Button variant="contained" color="primary" style={{ margin: "10px" }} onClick={this.chooseLocalMusic}>Choose local music files</Button>
                        <UrlList nameList={this.state.audioNameList} onClick={this.handleChooseUrl} selected={this.state.urlIndex} />
                        <input type="file" style={{ display: 'none' }} ref={this.hiddenFileInput} onChange={this.handleFileChange} multiple />
                    </div>
                </main>
            </div>
        );
    }
}