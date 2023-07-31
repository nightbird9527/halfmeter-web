import { create } from 'zustand'

// import type { MessageInstance } from 'antd/es/message/interface';
// import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
// import type { NotificationInstance } from 'antd/es/notification/interface';

const useStaticFuncStore = create((set) => {
    return {
        message: '',
        modal: '',
        notification: '',
        initial: (message, modal, notification) => set(() => ({message, modal, notification})),
    }
})

export default useStaticFuncStore