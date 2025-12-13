import { Layout, Spin } from "antd"
import { useCrypto } from "../../context/crypto-context"
import AppHeader from './AppHeader';
import AppSider from './AppSider';
import AppContent from './AppContent';

export default function AppLayout() {
    const {load} = useCrypto()

    if (load) {
        return <Spin fullscreen />
    }
     
    return (
        <Layout>
            <AppHeader />
            <Layout>
                <AppSider />
                <AppContent />
            </Layout>
        </Layout>
    )

}