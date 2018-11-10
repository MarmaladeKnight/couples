import React, {Component} from 'react'
import Area from './components/Area/Area.jsx'
import Head from './components/Head/Head.jsx'
import './body.scss'

class App extends Component {
    render() {
        return (
            <div>
                <Head/>
                <Area/>
            </div>
        )
    }
}

export default App