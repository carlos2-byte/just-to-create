package com.carlos.calculadora_de_rescisao_clt_brasil;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.google.android.gms.ads.MobileAds;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Inicializa AdMob
        MobileAds.initialize(this, initializationStatus -> {
        });
    }
}