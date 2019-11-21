const menus = [
  {id: '1',
    className: '3',
    label: '人员管理',
    submenu: [
      {
        id: 'user',
        label: '用户管理',
        name: 'user',
        icon: 'fa fa-hand-o-up'
      },
      {
        id: 'admin',
        label: '员工管理',
        icon: 'fa fa-hand-o-up'
      },
      {
        id: 'dept',
        label: '部门管理',
        icon: 'fa fa-hand-o-up'
      }
    ]
  },
  {
    id: '2',
    className: '3',
    label: '医疗管理',
    submenu: [
      {
        id: '21', label: '药品管理', icon: 'fa fa-hand-o-up'
      },
      {
        id: '22', label: '疾病管理', icon: 'fa fa-hand-o-up'
      },
      {
        id: '23', label: '床位管理', name: 'c-button', icon: 'fa fa-hand-o-up'
      }
    ]
  },
  {
    id: '3', label: '预约管理', className: '3'
  },
  {
    id: '4', label: '病历管理', className: '3'
  },
  {
    id: '5', label: '订单管理', className: '3'
  },
  {
    id: '6', label: '新增管理员', className: '4'
  },
  {
    id: '7', label: '医生工作站', className: '5'
  },
  {
    id: '8', label: '住院系统', className: '6'
  },
  {
    id: '9', label: '药房系统', className: '7'
  },
  {
    id: 'components',
    icon: 'fa fa-microchip',
    label: '组件',
    submenu: [
      {
        id: 'test',
        label: '二级测试',
        icon: 'fa fa-hand-o-up',
        submenu: [
          {
            id: 'test',
            label: '二级测试',
            icon: 'fa fa-hand-o-up'
          }
        ]
      },
      ['Form 表单', [
        {id: 'f1', name: 'c-button', label: 'Button 按钮', icon: 'fa fa-hand-o-up'},
        {id: 'f2', name: 'c-switch', label: 'Switch 开关', icon: 'fa fa-square-o'},
        {id: 'f3', name: 'c-checkbox', label: 'Checkbox 多选框', icon: 'fa fa-check-square'},
        // {id: 'f4', label: 'Radio 单选框', icon: 'fa fa-dot-circle-o'},
        {id: 'f5', name: 'c-input', label: 'Input 输入框', icon: 'fa fa-pencil'},
        {id: 'f6', name: 'c-keyboard', label: '虚拟键盘', icon: 'fa fa-keyboard-o'}
      ]],
      ['Notice', [
        {id: 'n1', name: 'c-alert', label: 'Alert 警告', icon: 'fa fa-info'},
        {id: 'n2', name: 'c-loading', label: 'Loading 加载', icon: 'fa fa-circle-o-notch'}
      ]],
      ['Other', [
        {id: 'c-dropdown', name: 'c-dropdown', label: 'Dropdown'},
        {id: 'c-navbar', name: 'c-navbar', label: 'Navbar'},
        {id: 'c-container', name: 'c-container', label: '栅格布局'}
      ]]
    ]
  },
  {
    id: 'pages',
    icon: 'fa fa-circle-o',
    label: 'Pages 页面',
    submenu: [
      {id: 'p-data-table', name: 'p-data-table', label: 'Table 表格数据'},
      {id: 'cnode', name: 'cnode', label: 'Cnode社区'},
      {id: 'p1', name: 'login', label: 'Login 登录'},
      {id: 'p2', name: 'p-login', label: 'Login 登录2'},
      {id: 'p3', name: 'p-register', label: 'Register 注册'},
      {id: '400', path: '/404', label: '404'},
      {id: '500', path: '/500', label: '500'}
    ]
  }
]
export default menus
