import React from 'react';
import styled from 'styled-components';

// Background-color stolen from withprimer.com
const Container = styled.div`
    position: absolute;
    left: 0;
    top: 30%;
    bottom: 30%;
    width: 50px;
    min-height: 200px;
    background-color: #7267e640;
    border-top-right-radius: 25px; 
    border-bottom-right-radius: 25px;
`;

const ScrollSpy = () => {
    return <Container />;
}

export default ScrollSpy;