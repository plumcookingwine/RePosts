import Index from './../views/Index'
import Common from './../views/Common';

const index = [{
    path: '/',
    name: 'index',
    component: Index
}, {
    path: '/index',
    name: 'index',
    component: Index
}, {
    path: '/common',
    name: 'common',
    component: Common
}];

export default index;