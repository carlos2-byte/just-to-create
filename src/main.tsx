import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import {
  AdMob,
  BannerAdSize,
  BannerAdPosition
} from '@capacitor-community/admob'


async function startAdMob(){

  try{

    // inicializa
    await AdMob.initialize({
      requestTrackingAuthorization: false
    })

    console.log("AdMob inicializado")

    // banner
    await AdMob.showBanner({
      adId: 'ca-app-pub-3940256099942544/6300978111',
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      isTesting: true
    })

    console.log("Banner exibido")

    // interstitial
    await AdMob.prepareInterstitial({
      adId: 'ca-app-pub-3940256099942544/1033173712',
      isTesting: true
    })

    setTimeout(async () => {

      await AdMob.showInterstitial()
      console.log("Interstitial exibido")

    }, 15000)

  }
  catch(e){

    console.log("Erro AdMob:", e)

  }

}


// iniciar quando app carregar
startAdMob()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)