import React from 'react';
import { Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    // eslint-disable-next-line
    withRouter
} from "react-router-dom"


class Mydata extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Rendered: true,
            realRendered: true,
            ticketId: this.props.match.params.ticketId
        }
    }
  
    componentDidMount() {
        this.renderAll()
        this.fakeRequest().then(() => {
            const el = document.querySelector(".loader-container");
            if (el) {
                el.remove();
                this.setState({
                    Rendered: false,
                })
            }
        })
    }

    fakeRequest = () => {
        return new Promise(resolve => setTimeout(() => resolve(), 577));
    };
  
    renderAll = async() => {
        try {
            let res = await fetch(`http://localhost:3001/getdata/`).then(r => r.json())
            this.setState({
                data: res.data,
                realRendered: false
            })
        } catch (err) {
            console.log(err);
        }   
    }
    render() {
        if (this.state.Rendered || this.state.realRendered) {      
            return null 
        }

        return (
            <div className="App-header">
                <p>{this.state && this.state.data && this.state.data.map(t => (
                    <Card className="text-white bg-dark mb-3">
                    <Card.Header>asdf</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        {t}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}</p>
            </div>
        )
    }
}

export default withRouter(Mydata);