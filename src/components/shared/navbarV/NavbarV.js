import React from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { isUserPermitted } from '../../../utils/permissions';
import { LOAD_DATA } from '../../../utils/permissionsTypes';


function NavbarV () {
    const { userPermissions } = React.useContext(UserContext);
    
    return (
        <div>
            {isUserPermitted(userPermissions, LOAD_DATA) &&
                <button>Load</button>
            }
        </div>
    )
}

export default NavbarV;