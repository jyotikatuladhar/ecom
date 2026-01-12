import { ConfigProvider } from "antd";

export function AntdProvider({ children }: { children: React.ReactNode }) {
    return <ConfigProvider
        theme={{
            cssVar: {
                key: "antd",
                prefix: "app"
            },
            token: {
                colorPrimary: 'rgb(var(--color-primary))',
                colorSuccess: 'rgb(var(--color-success))',
                colorWarning: 'rgb(var(--color-warning))',
                colorError: 'rgb(var(--color-danger))',

                colorTextBase: 'rgb(var(--color-text))',
                colorTextSecondary: 'rgb(var(--color-text-muted))',

                colorBgBase: 'rgb(var(--color-bg))',
                colorBgContainer: 'rgb(var(--color-bg))',

                colorBorder: 'rgb(var(--color-border))',
            },
            components: {
                Button: {
                    colorPrimary: 'rgb(var(--color-primary))',
                    colorPrimaryHover: 'rgb(var(--color-primary-hover))',
                    colorPrimaryActive: 'rgb(var(--color-primary-hover))',
                    colorTextLightSolid: '#ffffff',
                }
            }
        }
        } >
        {children}
    </ ConfigProvider>
}