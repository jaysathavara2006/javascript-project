let userdata = []

const savedata = ()=>{
    let alldata = JSON.parse(localStorage.getItem("userdata"))

    let len = alldata!=null? alldata.length+1 : 1

    let name = $("#name").val()
    let age = $("#age").val()
    let id = $("#id").val()
    let gender = $("input[type='radio']:checked").val()


    if(id == ''){

        // use  for insert data

        let obj ={
            id:len,
            name:name,
            age:age,
            gender:gender

        }
        userdata.push(obj)

    } else {

        // use for update data
        let updateddata = alldata.map((i)=>{

            if(i.id == id){

                i.name = name
                i.age = age
                i.gender = gender
    
            }
            return i
        })
        userdata = updateddata
    }
    localStorage.setItem("userdata",JSON.stringify(userdata))
    document.form.reset()

    $("#gender1").removeAttr("checked")
    $("#gender2").removeAttr("checked")

    disp()

}

const disp = ()=>{

    let alldata = JSON.parse(localStorage.getItem('userdata'))

    let txt = ''

    alldata.map((i)=>{
        
        txt +=`

        <tr>
        <td>${i.id}</td>
        <td>${i.name}</td>
        <td>${i.age}</td>
        <td>${i.gender}</td>

        <td>
        <button onclick="editdata(${i.id})">Edit</button>
        <button onclick="deldata(${i.id})">Delete</button>
        </td>
        </tr>
        
        `
    })

    $("#alldata").html(txt)
}

const deldata = (id)=>{
    
    let alldata = JSON.parse(localStorage.getItem('userdata'))

    let result = alldata.filter((i)=>{
        return i.id != id
    })

    let j=1
    let finaldata = result.map((i)=>{
        i.id=j++
        return i

    })
    localStorage.setItem("userdata",JSON.stringify(finaldata))
    disp()
    
}

const editdata = (id)=>{

    $("#gender1").removeAttr("checked")
    $("#gender2").removeAttr("checked")
    
    let alldata = JSON.parse(localStorage.getItem('userdata'))

    let result = alldata.find((i)=>{
        return i.id == id
    })

    $("#age").val(result.age)
    $("#name").val(result.name)
    $("#id").val(result.id)

    let gender = result.gender

    if(gender == "Male"){
        $('#gender1').attr("checked","true")
    } else {
        $('#gender2').attr("checked","true")

    }   
    disp()
}
// disp()   