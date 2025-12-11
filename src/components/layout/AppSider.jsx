import { Layout, Card, Statistic, List, Typography, Spin, Tag} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import {fakeCryptoFetch }from '../../api';
import {fakeCryptoAssets} from '../../api';
import { percentDiffrence, capitalize} from '../../utilus';
const siderStyle = {
   padding: '1rem',
};


export default function AppSider() {

    const [load, setLoad] = useState(false);
    const [crypto, setCrypto] = useState([]);
    const [assetsFetch, setAssetsFetch] = useState([]);

    useEffect(() => {
        async function preload() {
            setLoad(true)
            const { result } = await fakeCryptoFetch();
            const assets = await fakeCryptoAssets();
            setAssetsFetch(
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

    if (load) {
        return   <Spin fullscreen />
    }

    return (
        <Layout.Sider width="40%" style={siderStyle}>
            {assetsFetch.map((asset) => (
                <Card key={asset.id} style={{ marginBottom: '1rem' }}>
                    <Statistic  
                        title={capitalize(asset.id)}
                        value={asset.totalAmount}
                        precision={2}
                        valueStyle={{ color: asset.grow ? 'green' : 'red' } }
                        prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined/>}
                        suffix="$"
                    />
                    <List
                        dataSource={[
                            {
                                title: 'Total Profit', 
                                value: asset.totalProfit,
                                withTag: true,
                            },
                            {
                                title: 'Asset Amount', 
                                value: asset.amount, 
                                isPlain: true,
                            },
                            // {
                            //     title: 'Differnce', 
                            //     value: asset.growPercent,
                            // },
                        ]}
                        size = 'small'
                        renderItem={item => (
                            <List.Item>
                                <span>{item.title}</span>
                                <span>
                                    {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
                                    {item.isPlain && item.value}
                                    {!item.isPlain && <Typography.Text type={asset.grow ? 'success' : 'danger'}>{item.value.toFixed(2)}$</Typography.Text>}
                                </span>
                            </List.Item>
                        )}
                    />
                </Card>
            ))}
            
        </Layout.Sider>
    )
}