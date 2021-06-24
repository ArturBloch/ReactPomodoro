import React from 'react';

export default function CallbackButton({ name, value, callback }) {

    const invokeCallback = () => {
        callback(value);
    }

    return <button onClick={invokeCallback}>{name}</button>;
}