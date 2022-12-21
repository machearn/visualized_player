# Web audio player with real-time visualization
The project is Web audio player with real-time visualization. We mainly used Javascript and front-end framework React to implement an music player web application which can read and play local audio file, besides it can also visualize it’s read-time frequency data in an art-of-state form during the playing. 
In addition, G graphics renderer produced by Ali Antvis was also used during the development process, which is an easy to use, efficient, powerful 2D visual rendering engine, providing Canvas, SVG and other rendering methods. As a low-level renderer, it has many commonly used built-in graphics, provides full DOM event simulation and animation implementations, which helped us a lot to realize audio visualization and the construction of player's graphic interface.
It looks like this:

![img1](/public/p1.PNG)

---
##  Using Web audio API to read and process data of audio files
Before implementing the visulization animation of audio data, we need to get the data we need first, there are some Web audio API can be used.
First of all, we need to create an AudionContext, the reading of audio and the various processing of it take place in this context. The AudioContext interface represents an audio-processing graph built from audio modules linked together, each represented by an AudioNode, an audio context controls both the creation of the nodes it contains and the execution of the audio processing.
After create a context, we associate an audio player to it as input, then we use AudioContext.createAnalyser() to create an analyser node which followed by an gain node, in the analyser node, it will do fft to get the frequency data of audio and put it into an Uint8Array, then transfer the data to component of our application, so we can do visulization in our component.We create a MusicContext class and encapsulate the above operations into this class, so we can initial and use it more easily.

Create each node of the context, setting the parameters for fft and create and initialize the container of frequency data in the constructor of the MusicContext class.

![img2](/public/p2.PNG)

There are 3 methods of the class : The 'destroy' is used to destroy the context, disconnect each node; The 'setAudioElemnt' is used to associate an audio source to the context as input; The 'getFrequencyData' is used to get the real-time frequency domain data of source audio and put it into an array, then return it back.

![img3](/public/p3.PNG)

---
## Player component
The Player component is the uppermost component of our web application, each part we saw in the first picture is part of the Player componet, which means they are sub-components.

We can clearly see each part(component) of our project, all of them are part of Player component, the concrete implementation of each part is implemented in its own component, not in the Player component.
![img4](/public/p4.PNG)

![img5](/public/p5.PNG)


In this component, as mentioned before, we need to create an context to process audio, so we create a MusicContext object and in the 'componentDidMount' lifecycle function, which will execute  after the component is generated and mounted to the DOM, we call the 'setAudioElement' method to associate the audio player to it as input. We alse create and initialize refs and states for the component, by controlling these states in different methods of component to achieve interaction between user and application.

![img6](/public/p6.PNG)

The 'step' method is a key method. After the music plays, it will be the callback fuction of the 'requestAnimationFrame' function, so it will keep executing again and again, in the 'step' function, which will get the frequency data of each frame in real-time then transfer it to the Line component to render it in an art-of-state form. Other method is the click event callback function of buttons in the control pad of audio, used to control the play.

![img7](/public/p7.PNG)

---
## Create a rotating circle image
In our player, we want a circle image keep rotating during the music plays, which just like other popular music application, there's a spinning music cover. So we write a function named 'getImageCircle', so we just need to call this function in Line component to create such thing.

![img8](/public/p8.PNG)

We use APIs provided by G graphics renderer to implement it. The g-canvas to draw, the coordinate of center of the circle, radius and the shadowcolor will be the parameter of the function. In this function, we first call the addShape method to draw a circle, then we also add an image on it, the start point of the image should be the upper-left corner so it should be (x-r,y-r), (x,r) is the circle center's coordinate.However, we want a circle image instead of a square image, so we call the setClip method provided by G to clip the image to circle shape, just same as the circle we draw before.

![img9](/public/p9.PNG)

The next step is to find a way to make the image rotating. Rotation animation cannot be simulated by basic attributes directly. Matrix transformation is used here.We call 'animate' method to  add animation for the shapm then 'shape.getMatrix()' is used to obtain the initial matrix, and then the matrix corresponding to each ratio is calculated by 'transform'.
'transform' is an extended matrix transform method provided by G that takes two arguments, the first being the current matrix and the second being the Action array. The corresponding action for the rotation here is:<br>
['t', -x, -y],<br>
['r', angle of rotation],<br>
['t', x, y],

![img10](/public/p10.PNG)

---

