

import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './octicons.min.css';
import './sweetalert.min.css';




class App extends React.Component {


  handleclick(){
    console.log("Start button pushed");
  
    var o = new Object();
  
    // Can hint connection type
    // from 0..
    // ["GPRS", "3G", "4G", "WiFi", "Wireless", "Satellite", "DSL", "Cable", "Fiber", "", "Unsure"];
    // undefined == Unsure
    o.conntype = undefined;
    // for complete results, bufferbloat must be true
    // for faster results lacking grades and URL etc
    // set to false
    o.bufferbloat = true;
    
    // hz can be 4 (fastest), 2 (default) or 1 (slowest)
    // determines speed that onstatus is called
    o.hz = 4; 
  
    o.apiKey = '12345678'; // Test API key
  
    // fired continuously with basic info
    o.onstatus = function(e) {
      if (e.direction)
        console.log(e.direction + " megabit/sec: down/up " + e.down + " / " + e.up + " ping=" + e.ping + "ms");
         document.getElementById('down').innerHTML = Math.round(e.down) + "mbps";
          document.getElementById('up').innerHTML =  Math.round(e.up) + "mbps";
          document.getElementById('ping').innerHTML = e.ping + "ms";
           
          
        
        
    };
  
    // fired at 1hz with progress guesstimate
    o.onprogress = function(o) {
      document.getElementById('status').innerHTML = o.doing + " Progress:" + o.progress + "%";
    };
  
    o.onerror = function(o) {
      // this also marks the test end. oncomplete is not fired
      alert(o.msg);
    };
  
    // fired once upon successful conclusion
    // o has results.. see log for json version of structure
    o.oncomplete = function(o) {
      var s = JSON.stringify(o);
      console.log("oncomplete fired " + s);
      document.getElementById('ip').innerHTML = o.ip;
      document.getElementById('jitter').innerHTML = Math.round(o.jitter);
       document.getElementById('nearest').innerHTML = o.nearest;
       var str = o.grades
        document.getElementById('grades').innerHTML = /,(.+)/.exec(str)[1];
        document.getElementById('dns').innerHTML = o.dns;
        
        
      
    };
  
    // fired if the test wants to ask a question of the user with
    // a YES/NO answer.
    o.onconfirm = function(s) {
      return window.confirm(s);
    }; 
    
    // pass any user data in, it is stored 
    // and also returned with result.
    o.udata = { "myuserfield": "myvalue" };
  
    window.dslr_speedtest({
      op: 'start',
      params: o
    }); 
  }

 

  render() {
    return (
  
      <div className="container" >
        <div className="col-sm-5 text-center speed_container">
          <div className="panel panel-default">
  
            <button id='startbutton' onClick={this.handleclick}>
              Start Test</button>
  
            <br /> status: <span id='status'>
            </span>
  
            <div className="panel-body text-center">
              Download Speed <h3 id="down">0</h3>
              Upload Speed <h3 id="up">0</h3>
              Ping <h3 id="ping">0</h3>
              Jitter <h3 id="jitter">0</h3>
              IP <h4 id="ip">0</h4>
              Server <h4 id="nearest">0</h4>
              Quality and Buffert bolt <h4 id="grades">0</h4>
              DNS <h4 id="dns">0</h4>
              <div id='logdiv'>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    );
  }
}










export default App;
