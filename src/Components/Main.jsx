import { Button } from 'react-bootstrap'

var login = () => {
    window.location.href = 'https://login.yoru.pe.kr/login?redirecturi=http://localhost:3000/login'
}

var md = () => {
    window.location.href = '/mydata'
}

function App() {
    const el = document.querySelector(".loader-container");
    if (el) {
        el.remove()
    }
    return (
        <div className="App">
            {localStorage.getItem("email") ? 
                <header className="App-header">
                    <h1>파크봇 내 정보</h1>
                    <p>파크봇이 수집한 정보를 한눈에.</p>
                    <Button className="noto" variant="primary" style={{ marginTop: '10px' }} onClick={md}>수집한 정보 보기</Button>
                </header>
            : 
                <header className="App-header">
                    <h1>파크봇 내 정보</h1>
                    <p>파크봇이 수집한 정보를 한눈에.</p>
                    <Button className="noto" variant="primary" style={{ marginTop: '10px' }} onClick={login}>로그인하기</Button>
                </header>
            }
        </div>
    );
}

export default App;
