import React from 'react';
import { withRouter } from "react-router-dom"

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Rendered: false,
            oauthCode: this.props.match.params.oauthCode,
        }
    }
  
    componentDidMount() {
        this.renderAll()
    }
  
    renderAll = async() => {
        // let guildId = window.location.href.replace(/[^0-9]/g,'').replace(3000, "")
        try {
            const query = new URLSearchParams(this.props.location.search.replace('?', ''))
            const code = query.get('code')
            let res = await fetch(`http://localhost:3001/oauth2/?code=${code}`).then(r => r.json())
            // this will re render the view with new data
            await localStorage.setItem("id", res.id)
            await localStorage.setItem("email", res.email)
            if(res.email){
                this.setState({Rendered: true})
                window.location.href = '/mydata'
            }
        } catch (err) {
            console.log(err)
        }   
    }
  
    render() {
        return (
            <div className="App-header">
                {this.state.Rendered ? 
                    <div>자동으로 이동되지 않는다면 <a href="/">여기를</a> 클릭하세요.</div>
                :
                    <div>로딩 중... 이 화면이 지속된다면 <a href="/">다시 로그인 해 주세요.</a></div>
                }
            </div>
        )
    }
}

export default withRouter(Login);