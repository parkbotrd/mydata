import React from 'react';
import { Table, Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    // eslint-disable-next-line
    withRouter
} from "react-router-dom"

import {
    MobileView
} from "react-device-detect";


class Mydata extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Rendered: true,
            realRendered: true,
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
        return new Promise(resolve => setTimeout(() => resolve(), 100));
    };
  
    renderAll = async() => {
        try {
            if(!localStorage.getItem("id")) return window.location.href = "/"
            let res = await fetch(`http://192.168.0.2:3001/getdata?userid=${localStorage.getItem("id")}`).then(r => r.json())
            this.setState({
                id: res.id,
                playdata: res.playdata,
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
            <div className="App-mydata">

                <Alert variant='warning'>
                    파크봇은 제 3자에게 파크봇이 수집 및 저장한 데이터들을 공유하지 않습니다.
                </Alert>

                <MobileView>
                    <Alert variant='danger'>
                        해당 페이지는 데스크탑에 최적화 되어있습니다.
                    </Alert>
                </MobileView>

                <h1 className="noto">파크봇이 수집 및 저장한 데이터들</h1>

                <h3 style={{ marginTop: '50px' }}>유저아이디</h3>
                <p><code>{this.state.id}</code></p>

                <h3 style={{ marginTop: '50px' }}>음악 재생 기록</h3>
                <Table striped bordered hover variant="dark" style={{ width: "37vw", minWidth: "500px", marginTop: '5px' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>제목 : 영상아이디</th>
                        </tr>
                    </thead>
                    <tbody>
                        <p>{this.state && this.state.playdata && this.state.playdata.map(t => (
                            <tr>
                                <td>{t}</td>
                            </tr>
                        ))}</p>
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default withRouter(Mydata);