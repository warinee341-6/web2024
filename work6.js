const RB=ReactBootstrap;
const {Alert, Card, Button, Table} = ReactBootstrap;

const firebaseConfig = {
    apiKey: "AIzaSyA4wG0CLKzDI-tLns2g2ueQ3r_0hnkvmKk",
    authDomain: "web2567-a58ed.firebaseapp.com",
    projectId: "web2567-a58ed",
    storageBucket: "web2567-a58ed.firebasestorage.app",
    messagingSenderId: "565641109208",
    appId: "1:565641109208:web:70ced9c55ba2cb223e41ad",
    measurementId: "G-3Z6WYFK29R"
};
firebase.initializeApp(firebaseConfig);      
const db = firebase.firestore();
db.collection("students").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} =>`,doc.data());
  });
});

function StudentTable({data, app}) {
    // ตรวจสอบให้ 'data' เป็นอาร์เรย์
    const students = data || [];
    return (
      <table className='table'>
        <thead>
          <tr>
            <td>รหัส</td>
            <td>คำนำหน้า</td>
            <td>ชื่อ</td>
            <td>สกุล</td>
            <td>email</td>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.title}</td>
              <td>{s.fname}</td>
              <td>{s.lname}</td>
              <td>{s.email}</td>
              <td><EditButton std={s} app={app} /></td>
              <td><DeleteButton std={s} app={app} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  



function TextInput({label,app,value,style}){
    return <label className="form-label">
    {label}:    
     <input className="form-control" style={style}
     value={app.state[value]} onChange={(ev)=>{
         var s={};
         s[value]=ev.target.value;
         app.setState(s)}
     }></input>
   </label>;  
  }

function EditButton({std,app}){
    return <button onClick={()=>app.edit(std)}>แก้ไข</button>
   }
 
function DeleteButton({std,app}){    
    return <button onClick={()=>app.delete(std)}>ลบ</button>
  }

function LoginBox(props) {
    const u = props.user;
    const app = props.app;
    if (!u) {
        return <div><Button onClick={() => app.google_login()}>Login</Button></div>
    } else {
        return <div>
            <img src={u.photoURL} />
            {u.email}<Button onClick={() => app.google_logout()}>Logout</Button></div>
    }
}

 


class App extends React.Component {
    title = (
      <Alert variant="info">
        <b>Work6 :</b> Firebase
      </Alert>
    );
    footer = (
      <div>
        By 653380341-6 Warinee Anusurean <br />
        College of Computing, Khon Kaen University
      </div>
    );
    state = {
        scene: 0,
        students:[],
        stdid:"",
        stdtitle:"",
        stdfname:"",
        stdlname:"",
        stdemail:"",
        stdphone:"",
    }

    autoRead(){
        db.collection("students").onSnapshot((querySnapshot) => {
            var stdlist=[];
            querySnapshot.forEach((doc) => {
                stdlist.push({id:doc.id,... doc.data()});                
            });          
            this.setState({students: stdlist});
        });
    }
  
    readData(){
        db.collection("students").get().then((querySnapshot) => {
            var stdlist=[];
            querySnapshot.forEach((doc) => {
                stdlist.push({id:doc.id,... doc.data()});                
            });
            console.log(stdlist);
            this.setState({students: stdlist});
        });
    }
      
    insertData(){
        db.collection("students").doc(this.state.stdid).set({
           title : this.state.stdtitle,
           fname : this.state.stdfname,
           lname : this.state.stdlname,
           phone : this.state.stdphone,
           email : this.state.stdemail,
        });
    }

    edit(std){      
        this.setState({
         stdid    : std.id,
         stdtitle : std.title,
         stdfname : std.fname,
         stdlname : std.lname,
         stdemail : std.email,
         stdphone : std.phone,
        })
     }
 
     delete(std){
        if(confirm("ต้องการลบข้อมูล")){
           db.collection("students").doc(std.id).delete();
        }
    }

    state = {
        scene: 0,
        user : null,
    }
    constructor(){const RB = ReactBootstrap;
        const { Alert, Card, Button, Table } = ReactBootstrap;
        
        const firebaseConfig = {
          apiKey: "AIzaSyA4wG0CLKzDI-tLns2g2ueQ3r_0hnkvmKk",
          authDomain: "web2567-a58ed.firebaseapp.com",
          projectId: "web2567-a58ed",
          storageBucket: "web2567-a58ed.firebasestorage.app",
          messagingSenderId: "565641109208",
          appId: "1:565641109208:web:70ced9c55ba2cb223e41ad",
          measurementId: "G-3Z6WYFK29R"
        };
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        
        function StudentTable({ data, app }) {
          return (
            <table className="table">
              <thead>
                <tr>
                  <td>รหัส</td>
                  <td>คำนำหน้า</td>
                  <td>ชื่อ</td>
                  <td>สกุล</td>
                  <td>email</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {data.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.title}</td>
                    <td>{s.fname}</td>
                    <td>{s.lname}</td>
                    <td>{s.email}</td>
                    <td>
                      <EditButton std={s} app={app} />
                      <DeleteButton std={s} app={app} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
        }
        
        function TextInput({ label, app, value, style }) {
          return (
            <label className="form-label">
              {label}:
              <input
                className="form-control"
                style={style}
                value={app.state[value]}
                onChange={(ev) => {
                  const s = {};
                  s[value] = ev.target.value;
                  app.setState(s);
                }}
              />
            </label>
          );
        }
        
        function EditButton({ std, app }) {
          return <button onClick={() => app.edit(std)}>แก้ไข</button>;
        }
        
        function DeleteButton({ std, app }) {
          return (
            <button onClick={() => app.delete(std)}>ลบ</button>
          );
        }
        
        function LoginBox(props) {
          const u = props.user;
          const app = props.app;
          if (!u) {
            return (
              <div>
                <Button onClick={() => app.google_login()}>Login</Button>
              </div>
            );
          } else {
            return (
              <div>
                <img src={u.photoURL} />
                {u.email}
                <Button onClick={() => app.google_logout()} style={{marginLeft: 5, backgroundColor: 'red'}}>Logout</Button>
              </div>
            );
          }
        }
        
        class App extends React.Component {
          title = (
            <Alert variant="info">
              <b>Work6 :</b> Firebase
            </Alert>
          );
          footer = (
            <div>
              By 653380341-6 Warinee Anusurean <br />
              College of Computing, Khon Kaen University
            </div>
          );
        
          state = {
            scene: 0,
            students: [],
            stdid: "",
            stdtitle: "",
            stdfname: "",
            stdlname: "",
            stdemail: "",
            stdphone: "",
            user: null
          };
        
          constructor() {
            super();
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                this.setState({ user: user.toJSON() });
              } else {
                this.setState({ user: null });
              }
            });
          }
        
          autoRead() {
            db.collection("students").onSnapshot((querySnapshot) => {
              let stdlist = [];
              querySnapshot.forEach((doc) => {
                stdlist.push({ id: doc.id, ...doc.data() });
              });
              this.setState({ students: stdlist });
            });
          }
        
          readData() {
            db.collection("students").get().then((querySnapshot) => {
              let stdlist = [];
              querySnapshot.forEach((doc) => {
                stdlist.push({ id: doc.id, ...doc.data() });
              });
              this.setState({ students: stdlist });
            });
          }
        
          insertData() {
            db.collection("students").doc(this.state.stdid).set({
              title: this.state.stdtitle,
              fname: this.state.stdfname,
              lname: this.state.stdlname,
              phone: this.state.stdphone,
              email: this.state.stdemail,
            });
          }
        
          edit(std) {
            this.setState({
              stdid: std.id,
              stdtitle: std.title,
              stdfname: std.fname,
              stdlname: std.lname,
              stdemail: std.email,
              stdphone: std.phone,
            });
          }
        
          delete(std) {
            if (confirm("ต้องการลบข้อมูล")) {
              db.collection("students").doc(std.id).delete();
            }
          }
        
          google_login() {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope("profile");
            provider.addScope("email");
            firebase.auth().signInWithPopup(provider);
          }
        
          google_logout() {
            if (confirm("Are you sure?")) {
              firebase.auth().signOut();
            }
          }
        
          render() {
            return (
              <Card>
                <Card.Header>{this.title}</Card.Header>
                <LoginBox user={this.state.user} app={this} />
                <Card.Body>
                  <Button onClick={() => this.readData()} style={{marginRight: 10}}>Read Data</Button>
                  <Button onClick={() => this.autoRead()} style={{marginRight: 10}}>Auto Read</Button>
                  <div>
                    <StudentTable data={this.state.students} app={this} />
                  </div>
                </Card.Body>
                <Card.Footer>
                  <b>เพิ่ม/แก้ไขข้อมูล นักศึกษา :</b><br />
                  <TextInput label="ID" app={this} value="stdid" style={{ width: 120 ,marginRight: 5}} />
                  <TextInput label="คำนำหน้า" app={this} value="stdtitle" style={{ width: 100,marginRight: 5}} />
                  <TextInput label="ชื่อ" app={this} value="stdfname" style={{ width: 120 ,marginRight: 5}} />
                  <TextInput label="สกุล" app={this} value="stdlname" style={{ width: 120 ,marginRight: 5}} />
                  <TextInput label="Email" app={this} value="stdemail" style={{ width: 150,marginRight: 5 }} />
                  <TextInput label="Phone" app={this} value="stdphone" style={{ width: 120 ,marginRight: 5}} />
                  <Button onClick={() => this.insertData()} style={{ backgroundColor: 'green', color: 'white' }}>Save</Button>
                </Card.Footer>
                <Card.Footer>{this.footer}</Card.Footer>
              </Card>
            );
          }
        }
        
        const container = document.getElementById("myapp");
        const root = ReactDOM.createRoot(container);
        root.render(<App />);
        
        super();
        firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
              this.setState({user:user.toJSON()});
            }else{
              this.setState({user:null});
           }
        });    
    }


    google_login() {
        // Using a popup.
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("profile");
        provider.addScope("email");
        firebase.auth().signInWithPopup(provider);
    }


    google_logout(){
        if(confirm("Are you sure?")){
          firebase.auth().signOut();
        }
    }

    render() {
        return (
            <Card>
                <Card.Header>{this.title}</Card.Header>
                <LoginBox user={this.state.user} app={this}></LoginBox>
                <Card.Body></Card.Body>
                <Card.Footer>{this.footer}</Card.Footer>
            </Card>
        );
    }

    render() {
        // var stext = JSON.stringify(this.state.students);  
        return (
          <Card>
            <Card.Header>{this.title}</Card.Header>  
            <Card.Body>
              <Button onClick={()=>this.readData()}>Read Data</Button>
              <Button onClick={()=>this.autoRead()}>Auto Read</Button>
              <div>
              <StudentTable data={this.state.students} app={this}/>  
              </div>
            </Card.Body>
            <Card.Footer>
            <b>เพิ่ม/แก้ไขข้อมูล นักศึกษา :</b><br/>
            <TextInput label="ID" app={this} value="stdid" style={{width:120}}/>  
            <TextInput label="คำนำหน้า" app={this} value="stdtitle" style={{width:100}} />
            <TextInput label="ชื่อ" app={this} value="stdfname" style={{width:120}}/>
            <TextInput label="สกุล" app={this} value="stdlname" style={{width:120}}/>
            <TextInput label="Email" app={this} value="stdemail" style={{width:150}} />        
            <TextInput label="Phone" app={this} value="stdphone" style={{width:120}}/>
            <Button onClick={()=>this.insertData()}>Save</Button>
            </Card.Footer>
            <Card.Footer>{this.footer}</Card.Footer>
          </Card>          
        );
      }

    
  
  }



  const container = document.getElementById("myapp");
  const root = ReactDOM.createRoot(container);
  root.render(<App />);