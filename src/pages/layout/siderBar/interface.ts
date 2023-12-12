export interface IMenuItem {
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: IMenuItem[],
    type?: 'group',
}

export interface ISiderBarProps {
    siderStyle: any
}