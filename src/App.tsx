import React, { FC, useState, useEffect } from 'react';
import { Buffer } from 'buffer'
import './App.scss';
import imgOn from './assets/on.png'
import imgOff from './assets/off.png'
import { BluetoothDevice, BluetoothRemoteGATTService, BluetoothRemoteGATTCharacteristic } from 'liff-type';

const liff = window.liff

declare global {
  interface Window { characteristic: BluetoothRemoteGATTCharacteristic; }
}

const initBle = () => {
  liff.init({ liffId: process.env.REACT_APP_LIFF_ID as string }).then(() => {
    liff.initPlugins(['bluetooth']).then(() => 
      liffCheckAvailablityAndDo(() => liffRequestDevice())
    ).catch(() => alert('init fail'))
  })
}

const liffCheckAvailablityAndDo = (callbackIfAvailable: () => void) => {
  liff.bluetooth.getAvailability().then(isAvailable => {
      if (isAvailable) {
          callbackIfAvailable()
      } else {
          setTimeout(() => liffCheckAvailablityAndDo(callbackIfAvailable), 10000)
      }
  }).catch(() => alert('avaiable fail'))
}

const liffRequestDevice = () => {
  liff.bluetooth.requestDevice().then(device => {
      liffConnectToDevice(device)
  }).catch(() => alert('rquest fail'))
}

const liffConnectToDevice = (device: BluetoothDevice) => {
  device.gatt!.connect().then(() => {
      device.gatt!.getPrimaryService(process.env.REACT_APP_USER_SERVICE_UUID as string).then(service => {
          liffGetUserService(service);
      }).catch(() => alert('get service fail'))
  }).catch(() => alert('connect fail'))
}

const liffGetUserService = (service: BluetoothRemoteGATTService) => {
  const CHARACTERISTIC_UUID   = 'E9062E71-9E62-4BC6-B0D3-35CDCD9B027B';
  service.getCharacteristic(CHARACTERISTIC_UUID).then(characteristic => {
      window.characteristic = characteristic
      characteristic.writeValue(Buffer.from('0'))
      .catch(() => alert('init write fail'))
  }).catch(() => alert('get characteristic fail'))
}

const sendValue = (value: string) => {
  window.characteristic.writeValue(Buffer.from(value))
  .catch(() => alert('write fail'))
}

const App: FC = () => {
  const [lightValue, setLightValue] = useState<string>('512')
  const [lightOn, setLightOn] = useState<boolean>(false)

  useEffect(() => {
    initBle()
  }, [])

  return (
    <div className="App">
      <div className="light">
       <img src={lightOn ? imgOn : imgOff} alt="signal-light"/>
      </div>
      <div className="lightValue">
        {lightValue}
      </div>
      <div className="slider">
        <input type="range" defaultValue={512} min={0} max={1023} className="sliderBar" onChange={(e) => {
          setLightValue(e.target.value)
        }}/>
      </div>
      <button onClick={() => {
        setLightOn(!lightOn)
        !lightOn ? sendValue(lightValue) : sendValue('0')
      }} className="button">
        {lightOn ? 'OFF' : 'ON'}
      </button>
    </div>
  );
}

export default App;
