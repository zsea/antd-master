import React from 'react';
import {
    createFromIconfontCN
} from '@ant-design/icons';
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1623046_bext3ltexwp.js',
});
const LoadingIcon = () => <IconFont type="icon-loading" spin />;

export {
    LoadingIcon
}