import React, { FC, useState } from 'react';
import { Buffer } from 'buffer'
import './App.scss';
import imgOn from './assets/on.png'
import imgOff from './assets/off.png'
import { BluetoothDevice, BluetoothRemoteGATTService } from 'liff-type';

const liff = window.liff

const App: FC = () => {
const [lightValue, setLightValue] = useState<string>('0')
const [lightOn, setLightOn] = useState<boolean>(false)

  const sendValue = () => {
    liff.init({ liffId: process.env.REACT_APP_LIFF_ID as string }).then(() => {
      liff.initPlugins(['bluetooth']).then(() => 
        liffCheckAvailablityAndDo(() => liffRequestDevice())
      )
    })
  }
  
  const liffCheckAvailablityAndDo = (callbackIfAvailable: () => void) => {
    liff.bluetooth.getAvailability().then(isAvailable => {
        if (isAvailable) {
            callbackIfAvailable()
        } else {
            setTimeout(() => liffCheckAvailablityAndDo(callbackIfAvailable), 10000)
        }
    })
  }
  
  const liffRequestDevice = () => {
    liff.bluetooth.requestDevice().then(device => {
        liffConnectToDevice(device)
    })
  }
  
  const liffConnectToDevice = (device: BluetoothDevice) => {
    device.gatt!.connect().then(() => {
        device.gatt!.getPrimaryService(process.env.REACT_APP_USER_SERVICE_UUID as string).then(service => {
            liffGetUserService(service);
        })
    })
  }
  
  const liffGetUserService = (service: BluetoothRemoteGATTService) => {
    const CHARACTERISTIC_UUID   = 'E9062E71-9E62-4BC6-B0D3-35CDCD9B027B';
    service.getCharacteristic(CHARACTERISTIC_UUID).then(characteristic => {
        characteristic.writeValue(Buffer.from(lightValue))
    })
  }
  return (
    <div className="App">
      <div className="light">
       <img src={lightOn ? imgOn : imgOff} alt="signal-light"/>
      </div>
      <button onClick={() => setLightOn(lightOn ? false : true)} className="button">
        {lightOn ? 'OFF' : 'ON'}
      </button>
    </div>
  );
}

export default App;
