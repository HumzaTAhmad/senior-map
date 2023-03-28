
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const months = 5
const today = new Date()
const tempData = []
for (let i = 0; i < months; i++) {
    const date = new Date(today.getFullYear(), today.getMonth()+(i))
    tempData.push({
        date,
        name:moment(date).format('MMM YYYY'),
        users:0,
        rooms:0
    })
}

function AreaRoomsUsers({rooms, users}) {

    const[data, setData] = useState([])

    useEffect(()=>{
        for (let i = 0; i < months; i++) {
            tempData[i].users = 0
        }
        users.forEach(user=>{
            for (let i = 0; i < months; i++) {
                if(moment(tempData[i].date).isSame(user?.createdAt, 'month')) return tempData[i].users++
            }
        })
        setData([...tempData])
    }, [users])

    useEffect(()=>{
        for (let i = 0; i < months; i++) {
            tempData[i].rooms = 0
        }
        rooms.forEach(room=>{
            for (let i = 0; i < months; i++) {
                if(moment(tempData[i].date).isSame(room?.createdAt, 'month')) return tempData[i].rooms++
            }
        })
        setData([...tempData])
    }, [rooms])

    return (
        <div style={{width:'100%', height:300, minWidth:250}}>
            <ResponsiveContainer>
                <AreaChart
                data={data}
                margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0
                }}
                >
                
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="users"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                />
                <Area
                    type="monotone"
                    dataKey="rooms"
                    stackId="1"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

function mapStateToProps(state) {
    console.log(state)
    return {
      rooms: state.rooms,
      users: state.users
    };
  }
  
  export default connect(mapStateToProps)(AreaRoomsUsers);
  
  