import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Jimp from 'jimp';
import axios from 'axios';
import FormData from 'form-data';


setInterval(()=>{
    console.clear();
},3000)

class App extends Component {
    
    constructor(props) {
        super(props);
        axios.defaults.baseURL = 'http://localhost:3001';

       this.state = {
           file: '',
           showLoader:false,
           showUpload : true,
           showCrop: false,
           width: 256,
           height:256,
           quality:50,
           autoCropped:false,
           grayScale:false,
           flipH:false,
           flipV:false,
           mirrorV:false,
           showError:false,
           mirrorH:false,
           download:'',
           connectionError:false,
           ImgParseError: false
       };
        this.control = {
            width: "500px",
            height: "500px"
        }
        this.display = false;
        this.handleChange = this.handleChange.bind(this);
        this.sendToServer = this.sendToServer.bind(this);
        this.show = this.show.bind(this);
        this.showCrooper = this.showCrooper.bind(this);
        this.changeWidth= this.changeWidth.bind(this);
        this.changeHeight = this.changeHeight.bind(this);
        this.changeQuality = this.changeQuality.bind(this);
        this.autocropChecked = this.autocropChecked.bind(this);
        this.grayChecked =this.grayChecked.bind(this);
        this.flipHorizontal = this.flipHorizontal.bind(this);
        this.flipvartical = this.flipvartical.bind(this);
        this.SelectImg = this.SelectImg.bind(this);
        this.createLoader = this.createLoader.bind(this);
    }

    SelectImg(){
        if(this.state.showError){
         return(
            <div className="alert alert-danger alert-dismissible container" role="alert">
              You Need to Select the Image First
            </div>
       )
    }
}
connectionError(){
     if(this.state.connectionError){
         return(
            <div className="alert alert-danger alert-dismissible container" role="alert">
             Bad Request Make Sure You Have Working internet Connection
            </div>
       )
    }
}
ImgParseError(){
     if(this.state.ImgParseError){
         return(
            <div className="alert alert-danger alert-dismissible container" role="alert">
              Error In Parsing the Image. Please try Again.
            </div>
       )
    }
}
createLoader(){
    if(this.state.showLoader){
    return(
    <div className="loader"></div>
    )
  }
}

    sendToServer() {
        if(this.state.file === ""){
       this.setState({showError:true});
       setTimeout(() => {
           this.setState({showError:false});
        }, 3000);
        
            this.SelectImg();
        }
        else{
          this.setState({showLoader:true});
        var data = new FormData();
        data.append("img", this.state.file);
          const config = {
            headers: {'content-type':'multipart/form-data'},
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total);
              console.log('percent',percentCompleted);
            }
          };
          axios.put('/api/post', data, config)
            .then((res)=> {
            this.setState({showLoader:false});  
            this.setState({showUpload:false,showCrop:true});
             this.control = {
            width: this.state.width,
            height: this.state.height
        }
             Jimp.read(res.data._body.url)
             .then((img)=>{
            img.resize(this.control.width,this.control.height)
               .quality(this.state.quality)
               if(this.state.autoCropped){
                   img.autocrop()
               }
               if(this.state.grayScale){
                   img.greyscale()
               }
               img.flip( this.state.flipH,this.state.flipV);
               img.mirror( this.state.mirrorH,this.state.mirrorV);       // an alias for flip
               img.getBase64(Jimp.MIME_JPEG, (err, src) => {
               var img = document.getElementsByTagName('img')[1];
              img.setAttribute("src", src);
              document.body.appendChild(img);
              this.setState({download:src});

         });
       
             })
             .catch(function (err) {
                this.setState({ImgParseError:true});
                setTimeout(() => {
                    this.setState({ImgParseError:false});
                    }, 3000);
                 this.ImgParseError();
            });
        },(e)=>{
            console.log('e',e);
            this.setState({showLoader:false});
              this.setState({connectionError:true});
              setTimeout(() => {
                  this.setState({connectionError:false});
                    }, 3000);
                 this.connectionError();
        })
        // .catch(()=>{
        //     this.setState({showLoader:false});
        //       this.setState({connectionError:true});
        //       setTimeout(() => {
        //           this.setState({connectionError:false});
        //             }, 3000);
        //          this.connectionError();
        // })
    }
}

    handleChange(e){
        this.setState({file:e.target.files[0]})
        var reader = new FileReader();
        var file = e.target.files[0];
        reader.onload = (up) => {
            var ImageObject = document.getElementById('img');
            ImageObject.src = reader.result;
        }
      reader.readAsDataURL(file);
    }
   show(){
       if(this.state.showUpload){
       return(
           <div>
            <label className="btn btn-default btn-file">
               
            <input type="file" name="img" id="file"
            accept=".png,.jpg"
            placeholder="My Image"
            onChange={
                (event)=>{this.handleChange(event)}
            }
            />
            </label>
                {this.createLoader()}
            <div className="imgDiv">
            <img id="img" alt="No Image" style={this.control} />
            <br/>
            <br/>
            <button className="btn btn-success" onClick={this.sendToServer}> Upload</button>
            </div>   
            </div>        
       )
    }
   }
   changeWidth(e){
       this.setState({width:parseInt(e.currentTarget.value)},function(){
       this.sendToServer();
       });
   }
   changeHeight(h){
      this.setState({height:parseInt(h.target.value)},function(){
      this.sendToServer();
    });
}
   changeQuality(q){    
       this.setState({quality:parseInt(q.target.value)},function(){
      this.sendToServer();
    });
   }
   autocropChecked(a){
     this.setState({autoCropped:a.target.checked},function(){
      this.sendToServer();
    });
   }
grayChecked(e){
    this.setState({grayScale:e.target.checked},function(){
      this.sendToServer();
    });
}

    flipHorizontal(e){
    this.setState({flipH:e.target.checked},function(){
      this.sendToServer();
    });
  }
flipvartical(e){
    this.setState({flipV:e.target.checked},function(){
      this.sendToServer();
    });
}
mirrorHorizontal(e){
    this.setState({mirrorH:e.target.checked},function(){
      this.sendToServer();
   });
}
mirrorVertical(e){
    this.setState({mirrorV:e.target.checked},function(){
      this.sendToServer();
    });
}

    showCrooper(){
        if(this.state.showCrop){
          return(
           <div className="container">
           <div className="form-group">    
           <label>Image Width</label>
           <input type="number" className="form-control" placeholder="Change Width" value={this.state.width} onChange={
                (event)=>{this.changeWidth(event)}
            }/>
            </div>
         <div className="form-group">    
           <label>Image Height</label>
           <input type="number" className="form-control" placeholder="Change Height" value={this.state.height} onChange={
                (event)=>{this.changeHeight(event)}
            }/>
            </div>
           <div className="form-group">    
           <label>Image Quality</label>
           <input type="number" className="form-control" placeholder="Image Quality" value={this.state.quality} onChange={
                (event)=>{this.changeQuality(event)}
            }/>
            </div>
             <div className="checkbox">
            <label>
                <input type="checkbox" onChange={
                        (event)=>{this.grayChecked(event)}
                    } /> Gray Scale 
                </label>
                </div>
           <div className="checkbox">
               <label>
          <input type="checkbox" onChange={
                (event)=>{this.autocropChecked(event)}
            }/> Auto Crop
            </label>
           </div>
            <div className="checkbox">
            <label>
            <input type="checkbox" onChange={
                            (event)=>{this.flipHorizontal(event)}
                        } /> Flip Horizontal 
                </label>    
            </div>
           <div className="checkbox">
               <label>
              <input type="checkbox" onChange={
                (event)=>{this.flipvartical(event)}
            } /> Flip Vertical 
               </label>
           </div>
           <div className="checkbox">
               <label>
            <input type="checkbox" onChange={
                (event)=>{this.mirrorHorizontal(event)}
            } /> Mirror Horizontal 
               </label>
           </div>
          <div className="checkbox">
              <label>
            <input type="checkbox" onChange={
                (event)=>{this.mirrorVertical(event)}
            } /> Mirror Vertical
              </label>
          </div>
           <div className="imgDiv container">
            <img id="img" className="img-responsive cropImg" alt="No Image" style={this.control} />
             <br/>
            <br/>
            <a href={this.state.download} download className="btn btn-default"> Download</a>

            </div> 
 
            </div> 
          )
        }
    }



    render() {
        return ( 
        <div className="App">
            <div className="App-header" >
            <img src={ logo }
            className="App-logo"
            alt="logo" />
            <h4> Simple Image Resizer </h4>
             </div>
            <p className="App-intro"> Simple Image Resizer By <a href="https://www.github.com/ghayyas" target="_blank"> Ghayyas Mubashir </a> Build In React Js </p>
             {this.connectionError()}
             {this.ImgParseError()}
             {this.SelectImg()}
            {/*{this.createLoader()}*/}
             {this.show()}
             {this.showCrooper()}
            </div>
            
        );
    }
}

export default App;