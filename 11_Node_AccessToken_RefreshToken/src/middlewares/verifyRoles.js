
const verifyRoles = function(...allowedRoles) {
    return  function(request, response, next) {
        if(!request?.roles) {
            return response.status(401)
        }
        const rolesArray = [...allowedRoles];
        const result = request.roles.map((role) => {
            return rolesArray.includes(role)
        }).find((value) => {
            return value === true;
        })
        if(!result) {
            return response.status(401)
        }
        next();
    }
}

module.exports = verifyRoles;