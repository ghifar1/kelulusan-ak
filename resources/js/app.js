import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import RouterReact from './components/RouterReact';
import { ChakraProvider } from "@chakra-ui/react"

function Example() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>

                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;

if (document.getElementById('app')) {
    ReactDOM.render(
        <BrowserRouter>
            <ChakraProvider>
                <RouterReact />
            </ChakraProvider>
        </BrowserRouter>,
        document.getElementById('app'));
}
