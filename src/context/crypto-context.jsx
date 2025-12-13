import { createContext, useState, useEffect, useContext } from "react";
import {fakeCryptoFetch }from '../api';
import {fakeCryptoAssets} from '../api';
import { percentDiffrence } from '../utilus';

export const CryptoContext = createContext({
    assets: [],
    crypto: [],
    load: false,
}) 

export function ContextProvider({ children }) {

    const [load, setLoad] = useState(false);
    const [crypto, setCrypto] = useState([]);
    const [assets, setAssets] = useState([]);
    
    useEffect(() => {
        async function preload() {
            setLoad(true)
            const { result } = await fakeCryptoFetch();
            const assets = await fakeCryptoAssets();
            setAssets(
                assets.map((asset) => {
                    
                    const coin = result.find((c) => c.id === asset.id);
                        
                    return {
                        grow: asset.price < coin.price,
                        growPercent: percentDiffrence(asset.price, coin.price),
                        totalAmount: asset.amount * coin.price,
                        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                        ...asset,
                    }
                })
            );
            setCrypto(result)
            setLoad(false)
        }
        preload()
    }, [])
    return <CryptoContext.Provider value={{load, crypto, assets}}>{children}</CryptoContext.Provider>
}


export function useCrypto() {
    return useContext(CryptoContext);
}