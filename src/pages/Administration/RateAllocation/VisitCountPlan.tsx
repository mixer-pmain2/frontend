import React, {memo} from "react";
import Table from "../../../components/Table";
import {UnitName} from "../../../consts/user";

const mapper = (row: DoctorVisitCountPlan) => <>
    <td>{UnitName[row.unit]}</td>
    <td>{row.visit}</td>
    <td>{row.plan}</td>
</>


const VisitCountPlan = ({data}) => {

    return <div>
        <Table
            data={data}
            columns={["Подразделение", "Кол-во", "План"]}
            mapper={mapper}
        />
    </div>
}

export default memo(VisitCountPlan)
