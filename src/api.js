import {cryptoData, cryptoAssets} from './data' 

export function fakeCryptoFetch() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoData)
        }, 1)
    })
}


export function fakeCryptoAssets() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 1)
    })
}