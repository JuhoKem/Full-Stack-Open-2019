import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(url)
//  olisi voinut siirtää alla olevat tapahtumakäsittelijät tänne    
//  .then(response => {
//  console.log('promise fulfilled')
}

const create = RecordObject => {
    return axios.post(url, RecordObject)
}

const update = (id, RecordObject) => {
    return axios.put(`${url}/${id}`, RecordObject)
}

const remove = (id) => {
    //console.log('ID: ', url,id);
    return axios.delete(`${url}/${id}`)
}

export default {
    getAll,
    create,
    remove,
    update
}

// Olion määrittelyssä vasemmalla puolella olevat nimet tarkoittavat eksportoitavan olion kenttiä, 
// kun taas oikealla puolella olevat nimet ovat moduulin sisällä määriteltyjä muuttujia.
/*
export default {
    getAll : getAll,
    create : create,
    update : update
}
*/