export default {

    funds_type: {

        1: '入金-银行卡',
        2: '入金-微信支付',
        3: '入金-支付宝',
        /*4: '入金-电汇',*/
        5: '入金-线下充值',
        10: '入金-出金退回',
        40: "电汇-USD",
        41: "电汇-IDR",
        6: '转账-转入',
        7: '余额清零',
        /*8: '入金-交易返佣'},
        9: '入金-返利转入余额'},*/
        101: '出金-银行卡',
        /*102: '出金-电汇',*/
        103: '转账-转出',
        1020: "电汇-USD",
        1021: "电汇-IDR"
    },

    /*余额变更方式*/
    balance_change_type: {
        1: "银行卡",
        2: "微信",
        3: "支付宝",
        /*4: "电汇",*/
        5: "线下充值",
        6: "转账",
        7: "余额清零",
        8: "交易返佣",
        9: "返利转入余额",
        40: "电汇-USD",
        41: "电汇-IDR",
        101: "银行卡",
        /*102: "电汇",*/
        103: "转账",
        201: "代理每日返利",
        202: "普通销售每日返利",
        203: "销售组负责人每日返利",
        204: "销售部门负责人每日返利",
        301: "返利转出到余额",
        401: "普通销售每日返利",
        402: "销售组负责人每日返利",
        403: "销售部门负责人每日返利",
        901: "MT4交易",
        1020: "电汇-USD",
        1021: "电汇-IDR"
    },
    /*订单状态*/
    order_status: {
        1: "待支付",
        2: "待审核",
        3: "待到账确认",
        4: "待系统处理",
        5: "待银行打款",
        6: "待系统返利打款",
        7: "待读取余额",
        101: "系统处理失败",
        102: "读取余额失败",
        201: "已忽略",
        202: "已退回",
        203: "已取消",
        204: "已完成",
        205: "支付失败"
    },
    /*代理和客户的账户类型*/
    customer_ib_type: {
        1: "Standard",
        2: "Standard",
        3: "Standard",
        4: "Mini",
        5: "Mini",
        6: "Mini",
        9: "Virtual",
    },
    /*customer_ib_type: [
        {"value": 1, "key": "NORMAL_FIX_A"},
        {"value": 2, "key": "NORMAL_FIX_B"},
        {"value": 3, "key": "NORMAL_FLOAT"},
        {"value": 4, "key": "MINI_FIX_A"},
        {"value": 5, "key": "MINI_FIX_B"},
        {"value": 6, "key": "MINI_FLOAT"},
        {"value": 9, "key": "虚拟账户"}
    ],*/
    customer_ib_type_map: {
        1: "NORMAL_FIX_A",
        2: "NORMAL_FIX_B",
        3: "NORMAL_FLOAT",
        4: "MINI_FIX_A",
        5: "MINI_FIX_B",
        6: "MINI_FLOAT",
        9: "虚拟账户",
    },
    /* 账户类型多对应的汇率 */
    customer_ib_rate_map: {
        1: 10000,
        2: 12000,
        3: "FLOAT",
        4: 10000,
        5: 12000,
        6: "FLOAT"
    },
    /*账户类型是否满足客户*/
    customer_type_satisfied: {
        1: "是",
        2: "否"
    },
    /*销售类型*/
    sales_state: {
        1: "在职",
        2: "离职",
        3: "兼职"
    },
    /*性别*/
    gender_map: {
        1: "男",
        2: "女",
    },
    /*证件类型*/
    identity_type_map: {
        1: "身份证",
        2: "驾驶执照",
        3: "护照"
    },
    /* 行为日志类型 */
    operation: {
        login: {type: 0, label: "登录"},
        loginOut: {type: 1, label: "退出"},
        add: {type: 2, label: "新增"},
        eidt: {type: 3, label: "修改"},
        del: {type: 3, label: "删除"},
        setRole: {type: 3, label: "授权"},
        getList: {type: 3, label: "查询列表"},
        getId: {type: 3, label: "查询ID详情"},
    },
    log_type: [
        {'key': '登录', 'value': '0'},
        {'key': '退出', 'value': '1'},
        {'key': '新增', 'value': '2'},
        {'key': '修改', 'value': '3'},
        {'key': '删除', 'value': '4'},
        {'key': '授权', 'value': '5'},
        {'key': '查询列表', 'value': '6'},
        {'key': '查询ID详情', 'value': '7'},
        {'key': '踢出用户', 'value': '8'}
    ],

    deposit_cause_type: {
        40: "电汇-USD",
        41: "电汇-IDR",
    },
    deposit_status_type: {
        2: "待审核",
        3: "待到账确认",
        4: "待系统处理",
        101: "系统处理失败",
        201: "已忽略",
        204: "已完成"
    },

    /*deposit_status: [
        {'key': '已完成', 'value': '204'},
        {'key': '待支付', 'value': '1'},
        {'key': '待审核', 'value': '2'},
        {'key': '待到账确认', 'value': '3'},
        {'key': '已忽略', 'value': '201'},
        {'key': '待系统处理', 'value': '4'},
        {'key': '支付失败', 'value': '205'},
        {'key': '系统处理失败', 'value': '101'}
    ],*/


    withdraw_cause_type: {
        1020: "电汇-USD",
        1021: "电汇-IDR"
    },
    withdraw_status_type: {
        2: "待审核",
        4: "待系统处理",
        5: "待银行打款",
        101: "系统处理失败",
        201: "已忽略",
        202: "已退回",
        203: "已取消",
        204: "已完成"
    },
    /*withdraw_withdraw_type: [
        {'key': '电汇', 'value': '102'},
        {'key': '银行卡', 'value': '101'}],
    withdraw_type: [
        {'key': '标准账户', 'value': '1'},
        {'key': 'ECN账户', 'value': '2'},
        {'key': 'STP账户', 'value': '3'}
    ],*/
    /*withdraw_status: [
        {'key': '已完成', 'value': '204'},
        {'key': '待审核', 'value': '2'},
        {'key': '待银行打款', 'value': '5'},
        {'key': '已忽略', 'value': '201'},
        {'key': '待系统处理', 'value': '4'},
        {'key': '系统处理失败', 'value': '101'},
        {'key': '已退回', 'value': '202'},
        {'key': '已取消', 'value': '203'},
    ],*/
    /*transfer_status: [
        {'key': '已完成', 'value': '204'},
        {'key': '待审核', 'value': '2'},
        {'key': '已忽略', 'value': '201'},
        {'key': '待系统处理', 'value': '4'},
        {'key': '系统处理失败', 'value': '101'},
        {'key': '已取消', 'value': '203'}
    ],
    clear_balance_status: [
        {'key': '已完成', 'value': '204'},
        {'key': '待审核', 'value': '2'},
        {'key': '已忽略', 'value': '201'},
        {'key': '待系统处理', 'value': '4'},
        {'key': '系统处理失败', 'value': '101'}
    ],*/
    clear_balance_status_type: {
        2: "待审核",
        4: "待系统处理",
        101: "系统处理失败",
        201: "已忽略",
        204: "已完成"
    },
    rebate_to_balance_status_type: {
        204: "已完成"
    },
    /*rebate_to_balance_status: [
        {'key': '已完成', 'value': '204'},
        {'key': '已失败', 'value': '101'}
    ],*/

    /* 身份证件 */
    identity_type: [
        {'value': 1, 'key': '身份证'},
        {'value': 2, 'key': '驾驶执照'},
        {'value': 3, 'key': '护照'}
    ],
    /* 称呼 */
    gender: [
        {'value': 1, 'key': '先生'},
        {'value': 2, 'key': '女士'}
    ],
    /* 潜在代理状态 */
    potential_state: [
        {'value': '30', 'key': '未完成'},
        {'value': '31', 'key': '待审核'},
        {'value': '33', 'key': '已开户'},
        {'value': '32', 'key': '已拒绝'},
    ],
    /* 注册待审核代理 */
    status: [
        {'value': '31', 'key': '待审核'},
        {'value': '33', 'key': '已开户'},
        {'value': '32', 'key': '已拒绝'},
    ],
    potential_state_map: {
        30: '未完成',
        31: '待审核',
        33: '已开户',
        32: '已拒绝'
    },
    /* 注册客户 */
    customer_state: {
        33: '已开户',
        1: '未开户'
    },
    customer_opening_state: {
        4: '已开户',
        "0,1,2,3,5,6": '未开户',
    },
    customer_opening_state_map: {
        4: '已开户',
        0: '未开户',
        1: '未开户',
        2: '未开户',
        3: '未开户',
        5: '未开户',
        6: '未开户',
    },
    /* 注册客户详情 */
    //开户目的
    purpose_of_account_opening:[
        {"value":0,"label":"增益/收益"},
        {"value":1,"label":"套期保值/对冲"},
        {"value":2,"label":"投机"},
        {"value":3,"label":"其他"}
    ],
    purpose_of_account_opening_map: {
        0: "增益/收益",
        1: "套期保值/对冲",
        2: "投机",
        3: "其他",
    },
    //婚姻状况
    marital_status_map: {
        0: "未婚",
        1: "娶/嫁",
        2: "寡妇",
        3: "鳏夫",
    },
    //职业
    occupation_map: {
        0: "私人/员工",
        1: "企业家/商人",
        2: "家庭主妇/家庭主妇",
        3: "专业/专业",
        4: "政府雇员",
        5: "学生/学生",
        6: "其他/其他人"
    },
    //房屋产权情况
    house_ownership_map: {
        0: "自我房产",
        1: "家庭",
        2: "租住",
        3: "其他",
    },
    //客户详情年收入
    customer_annual_income_map: {
        0: "在1亿-2.5亿之间",
        1: "在2.5亿-5亿之间",
        2: "5亿以上",
    },


    /* 客户账户状态 */
    account_state: [
        {'value': '1', 'key': '正常'},
        {'value': '50', 'key': '只读'},
        {'value': '51', 'key': '禁用'},

    ],
    open_account_state: [
        {'value': '2', 'key': '待审核'},
        {'value': '3', 'key': '待审核-已确认'},
        {'value': '4', 'key': '已激活'},
        {'value': '5', 'key': '已拒绝'},
        // {'value': '6', 'key': '已删除'},
    ],

    /*代理账户状态*/
    agent_account_state: [
        {'value': '1', 'key': '正常'},
        {'value': '51', 'key': '禁用'},
    ],
    account_state_map: {
        1: '正常',
        2: '逻辑删除',
        40: '停用',
        50: '只读',
        51: '禁用'
    },

    open_account_state_map: {
        2: '待审核',
        3: '待审核-已确认',
        4: '已激活',
        5: '已拒绝',
        // 6: '已删除'
    },

    /* 代理账户类型 */
    account_type: [
        /*{'key': '标准账户', 'value': '1'},
        {'key': 'STP账户', 'value': '2'},
        {'key': 'ECN账户', 'value': '3'}*/
        {'key': 'Standard', 'value': '1,2,3'},
        {'key': 'Mini', 'value': '4,5,6'},
        {'key': 'Virtual', 'value': '9'}
    ],

    /* 沟通方式 */
    recorder_type: [
        {key: '电话', value: 1},
        {key: '邮件', value: 2},
        {key: '微信', value: 3},
        {key: '短信', value: 4},
        {key: '面谈', value: 5},
        {key: '其他', value: 6}
    ],

    /* 客户详情 资金着*/
    job: [        //就业情况
        {value: 1, key: '受雇'},
        {value: 2, key: '自雇'},
        {value: 3, key: '退休'},
        {value: 4, key: '失业'},
        {value: 5, key: '学生'},
        {value: 6, key: '家庭主妇'}
    ],
    job_map: {      //就业情况
        1: '受雇',
        2: '自雇',
        3: '退休',
        4: '失业',
        5: '学生',
        6: '家庭主妇'
    },
    capital_source: [        //资金来源
        {value: 1, key: '无资金来源'},
        {value: 2, key: '储蓄'},
        {value: 3, key: '退休金'},
        {value: 4, key: '政府援助'},
        {value: 5, key: '礼物馈赠'},
        {value: 6, key: '遗产继承'},
        {value: 7, key: '出售物业'},
        {value: 8, key: '出售/清算投资'}
    ],
    capital_source_map: {       //资金来源
        1: '无资金来源',
        2: '储蓄',
        3: '退休金',
        4: '政府援助',
        5: '礼物馈赠',
        6: '遗产继承',
        7: '出售物业',
        8: '出售/清算投资'
    },
    annual_income: [        //年收入
        {value: 1, key: '少于$25000'},
        {value: 2, key: '$25000-$49999'},
        {value: 3, key: '$50000-$99999'},
        {value: 4, key: '$100000-$249999'},
        {value: 5, key: '$250000-$1000000'},
        {value: 6, key: '多于$1000000'}
    ],
    annual_income_map: {       //年收入
        1: '少于$25000',
        2: '$25000-$49999',
        3: '$50000-$99999',
        4: '$100000-$249999',
        5: '$250000-$1000000',
        6: '多于$1000000'
    },
    total_asset: [        //总资产
        {value: 1, key: '少于$25000'},
        {value: 2, key: '$25000-$49999'},
        {value: 3, key: '$50000-$99999'},
        {value: 4, key: '$100000-$249999'},
        {value: 5, key: '$250000-$999999'},
        {value: 6, key: '$1000000-$4999999'},
        {value: 7, key: '$5000000-$9999999'},
        {value: 8, key: '多于$10000000'}
    ],
    total_asset_map: {      //总资产
        1: '少于$25000',
        2: '$25000-$49999',
        3: '$50000-$99999',
        4: '$100000-$249999',
        5: '$250000-$999999',
        6: '$1000000-$4999999',
        7: '$5000000-$9999999',
        8: '多于$10000000'
    },
    experience: [        //是否有交易经验
        {value: 1, key: '是'},
        {value: 2, key: '否'}
    ],
    experience_map: {      //是否有交易经验
        1: '是',
        2: '否'
    },
    assess_risk: [        //是否有评估风险能力
        {value: 1, key: '是'},
        {value: 2, key: '否'}
    ],
    assess_risk_map: {       //是否有评估风险能力
        1: '是',
        2: '否'
    },
    professional: [        //是否是专业人士
        {value: 1, key: '是'},
        {value: 2, key: '否'}
    ],
    professional_map: {        //是否是专业人士
        1: '是',
        2: '否'
    },

    /* 职位 */
    position: [

        {'value': '1', 'key': '客户总监'},
        {'value': '2', 'key': '团队经理'},
        {'value': '3', 'key': '客户经理'},
    ],

    /* 销售职位 */
    sales_position_map: {
        1: '客户总监',
        2: '团队经理',
        3: '客户经理'
    },

    /*代理详情 - 银行状态*/
    band_state: [
        {'value': '1', 'key': '正常'},
        {'value': '2', 'key': '删除'},
    ],

    /* 资金信息 - 出金记录 */
    //订单状态
    funds_status: [
        {'value': '1', 'key': '待支付'},
        {'value': '2', 'key': '待审核'},
        {'value': '3', 'key': '待到账确认'},
        {'value': '4', 'key': '待系统处理'},
        {'value': '5', 'key': '待银行打款'},
        {'value': '6', 'key': '待系统返利打款（目前只用于返利）'},
        {'value': '7', 'key': '待读取余额（目前只用于返利）'},
        {'value': '101', 'key': '系统处理失败'},
        {'value': '102', 'key': '读取余额失败（目前只用于返利）'},
        {'value': '201', 'key': '已忽略'},
        {'value': '202', 'key': '已退回'},
        {'value': '203', 'key': '已取消'},
        {'value': '204', 'key': '已完成'},
        {'value': '205', 'key': '支付失败'},
    ],
    //资金类型
    funds_channel_type: [
        {'value': '1',  'key': '入金-银行卡'},
        {'value': '2',  'key': '入金-微信支付'},
        {'value': '3',  'key': '入金-支付宝'},
        {'value': '4',  'key': '入金-电汇'},
        {'value': '5',  'key': '入金-线下充值'},
        {'value': '6',  'key': '入金-转账'},
        {'value': '7',  'key': '入金-余额清零'},
        {'value': '8',  'key': '入金-交易返佣'},
        {'value': '9',  'key': '入金-返利转入余额'},
        {'value': '40',  'key': '入金_电汇_USD'},
        {'value': '41',  'key': '入金_电汇_IDR'},
        {'value': '101', 'key': '出金-银行卡'},
        {'value': '102', 'key': '出金-电汇'},
        {'value': '103', 'key': '出金-转账'},
        {'value': '201', 'key': '入金-代理每日返利（余额）'},
        {'value': '202', 'key': '入金-普通销售每日返利（余额）'},
        {'value': '203', 'key': '入金-销售组负责人每日返利（余额）'},
        {'value': '204', 'key': '入金-销售部门负责人每日返利（余额）'},
        {'value': '301', 'key': '出金-返利转出到余额'},
        {'value': '401', 'key': '入金-普通销售每日返利（层级）'},
        {'value': '402', 'key': '入金-销售组负责人每日返利（层级）'},
        {'value': '403', 'key': '入金-销售部门负责人每日返利（层级）'},
        {'value': '901', 'key': 'MT4交易'},
        {'value': '1020',  'key': '出金_电汇_USD'},
        {'value': '1021',  'key': '出金_电汇_IDR'},
    ],
    funds_channel_type_map: [
        {'value': '1', 'key': '入金-银行卡'},
        {'value': '2', 'key': '入金-微信支付'},
        {'value': '3', 'key': '入金-支付宝'},
        {'value': '4', 'key': '入金-电汇'},
        {'value': '5', 'key': '入金-线下充值'},
        {'value': '6', 'key': '入金-转账'},
        {'value': '7', 'key': '入金-余额清零'},
        {'value': '8', 'key': '入金-交易返佣'},
        {'value': '9', 'key': '入金-返利转入余额'},
        {'value': '101', 'key': '出金-银行卡'},
        {'value': '102', 'key': '出金-电汇'},
        {'value': '103', 'key': '出金-转账'},
        {'value': '201', 'key': '入金-代理每日返利（余额）'},
        {'value': '202', 'key': '入金-普通销售每日返利（余额）'},
        {'value': '203', 'key': '入金-销售组负责人每日返利（余额）'},
        {'value': '204', 'key': '入金-销售部门负责人每日返利（余额）'},
        {'value': '301', 'key': '出金-返利转出到余额'},
        {'value': '401', 'key': '入金-普通销售每日返利（层级）'},
        {'value': '402', 'key': '入金-销售组负责人每日返利（层级）'},
        {'value': '403', 'key': '入金-销售部门负责人每日返利（层级）'},
        {'value': '901', 'key': 'MT4交易'},
    ],
    //交易类型
    funds_type_map: {
        0: "BUY(买入)",
        1: "SELL(卖出)",
        2: "BUY LIMIT",
        3: "SELL LIMIT",
        4: "BUY STOP",
        5: "SELL STOP",
        6: "BALANCE",
        7: "CREDIT"
    },
    funds_order_status_map: {
        0: "平仓",
        1: "持仓"
    },

    //返利管理
    /*rebate_order_status_select: [
        {'key': '全部', 'value': ''},
        {'key': '待审核', 'value': '2'},
        {'key': '待系统返利打款', 'value': '6'},
        {'key': '已完成', 'value': '204'}
    ],*/
    rebate_status_type: {
        2: "待审核",
        6: "待系统返利打款",
        204: "已完成"
    },
    /*role_type_select: [
        // {'key': '客户', 'value': '1'},
        {'key': '代理', 'value': '2'},
        {'key': '销售', 'value': '3'}
    ],*/
    rebate_role_type: {
        1: "客户",
        3: "销售"
    },

    // 币种
    "currency_type":{
        2:"印尼盾",
        1:"美元"
    },

    history_record: [

        {'key': "入金汇率", 'value': 'deposit_exchange_rate'},
        {'key': "出金汇率", 'value': 'withdraw_exchange_rate'},
        {'key': "默认杠杆", 'value': 'default_leverage'},
        {'key': "大额播报金额", 'value': 'large_amount_deposit_limit'},
        {'key': "大额播报邮箱", 'value': 'large_amount_deposit_email'},
        {'key': "电汇免费出金次数", 'value': 'withdraw_free_times'},
        {'key': "出金手续费", 'value': 'withdraw_poundage'},
        {'key': "最小入金金额", 'value': 'deposit_min_limit'},
        {'key': "最小出金金额", 'value': 'withdraw_min_limit'},
        {'key': "最大入金金额", 'value': 'deposit_max_limit'},
        {'key': "每日出金次数", 'value': 'withdraw_max_count'},
        {'key': "每日转账次数", 'value': 'transfer_max_count'}
    ]

}