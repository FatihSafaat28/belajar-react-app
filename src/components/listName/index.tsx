type ListNameProp ={
    userName:string;
    index:number;
    changeFunction?:()=>void;
}

const ListName = ({userName, index, changeFunction}:ListNameProp)=>{
    return(
        <div>
            <span>
                {index+1}. {userName}
            </span>
            <button className="ml-2 text-sm text-blue-600 cursor-pointer" onClick={changeFunction}>Rubah</button>
        </div>
    );
}

export default ListName;