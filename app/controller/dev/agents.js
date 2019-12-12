/**
 * author:cuiyajuan
 * created date :2018-01-03
 */
var Mock = require('mockjs')
var agentsMock = require("../../mock/data/agents");

let _agents = agentsMock.Agents();
exports.agentRegisterList=function(req,res,next){
    let _res = res;
    let _req = req;
    let{page_no,page_size,name}=_req.body;
    console.log(name);
    let mockUsers = _agents.filter(agent => {

        if (name && agent.name.indexOf(name) === -1) return false;
        return true;
    });
    let total = mockUsers.length;
    mockUsers = mockUsers.filter((u, index) => index < page_size * page_no && index >= page_size * (page_no - 1));
    let datas ={
        total:total,
        items:mockUsers
    };

    let result ={
        status:'200',
        msg:'',
        datas:JSON.stringify(datas)
    };
    _res.json(result);
};

/*注册待审核列表*/
 _pendAgents = agentsMock.PendAgents();
exports.pendAgentsList=function(req,res,next){
    let _res = res;
    let _req = req;
    let{page_no,page_size,name}=_req.body;

    let mockUsers = _pendAgents.filter(agent => {
        if (name && agent.name.indexOf(name) === -1) return false;
        return true;
    });
    let total = mockUsers.length;
    mockUsers = mockUsers.filter((u, index) => index < page_size * page_no && index >= page_size * (page_no - 1));
    let datas ={
        total:total,
        items:mockUsers
    };

    let result ={
        status:'200',
        msg:'',
        datas:JSON.stringify(datas)
    };
    _res.json(result);
};


/*审核  （同意） */
exports.updateAgrees=function(req,res,next){
    let {id, link, state} = req.body;
    _agents.some(u => {
        if (u.id === id) {
            u.state = state;
            return true;
        }
    });

    var result = {
        status: 200,
        msg: '修改成功',
        datas:''
    }
    res.json(result)
};

/*审核  （拒绝） */
exports.updateRefuses=function(req,res,next){
    let {id, mark, state} = req.body;
    _agents.some(u => {
        if (u.id === id) {
            u.mark = mark;
            u.state = state;
            return true;
        }
    });

    var result = {
        status: 200,
        msg: '修改成功',
        datas:''
    }
    res.json(result)
};


/*潜在代理详情*/
exports.agentPotentialDetails=function(req,res,next){
    let _res = res;
    let _req = req;
    let{page_no,page_size,id}=_req.body;

    let mockUsers = _pendAgents.filter(agent => {
        if (id.length>0 && agent.id.indexOf(id) === -1) return false;
        return true;
    });

    //let total = mockUsers.length;
    //mockUsers = mockUsers.filter((u, index) => index < page_size * page_no && index >= page_size * (page_no - 1));
    let datas ={
        //total:total,
        items:mockUsers
    };

    let result ={
        status:'200',
        msg:'',
        datas:JSON.stringify(datas)
    };
    _res.json(result);
};

/*代理详情*/
exports.getAgentById =function(req,res,next){
    let _res = res;
    let _req = req;
    let{page_no,page_size,id}=_req.body;

    let mockUsers = _pendAgents.filter(agent => {
        if (id.length>0 && agent.id.indexOf(id) === -1) return false;
        return true;
    });

    let datas ={
        items:mockUsers
    };

    let result ={
        status:'200',
        msg:'',
        datas:JSON.stringify(datas)
    };
    _res.json(result);
};
