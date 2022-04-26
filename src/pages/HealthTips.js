import React from "react";
/*import functions from react */
import './HealthTips.css'
/*import functions from The HealthTips.css folder */

/*exports the Healthtips function to the page */
export default function HealthTips() {
  // exports the HealthTips function
  return (
    <div>
      <body>
       <box>      
      <h1 className="heading-Main">HealthTips</h1>
      {/* sets formatting for the first heading */}
      <h2 className="heading-Main-2">Here are some videos that we hope can help guide you into a healthier lifestyle</h2>
      {/* starts the formatting for the first video */}
      <iframe
        class="video-1"
        /*uses formatting from the video-1 function in HealthTips.css */
        title= "Healthy Food"
        src="https://www.youtube.com/embed/APwwGy4GzK8"
        // sets link for the youtube video
      />{" "}
      <h3 className="heading-vid-1">This video shows simple meals that are healthy for you.</h3>
      {/* sets heading for the the first video */}
      <iframe
        class="video-2"
        // sets formatting for the 2nd video
        title= "Counting Calories"
        src="https://www.youtube.com/embed/95O1fVXCVok"
        // sets link for youtube videos
      />{" "}
      <h3 className="heading-vid-2">This video explains how to run a calorie deficit to lose weight</h3>
      {/* sets heading for 2nd video */}
      <iframe
        class="video-3"
        title= "Excercises"
        src="https://www.youtube.com/embed/3sEeVJEXTfY?start=32"
        // sets link for youtube videos
      />{" "}
      <h3 className="heading-vid-3">This video shows excersises that dont need any equipment</h3>
      {/* sets heading for the 3rd video */}
      </box> 
      </body>
    </div>
  );
}