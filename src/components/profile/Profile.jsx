import { Avatar, Button, Card, Divider, Skeleton, Typography } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfileAsync } from "../../feature/userSlice";

const { Title, Text, Paragraph } = Typography;
import Cookies from "js-cookie"
import { useEffect, useState } from "react";
import { sendMediaFileAsync } from "../../feature/messageSlice";
import {
    MailOutlined,
    EditOutlined,
    UserOutlined,
    EnvironmentOutlined,
    CalendarOutlined,
    HeartOutlined,
    TeamOutlined,
    ManOutlined,
    MessageOutlined,
    GlobalOutlined,
    CheckOutlined,

} from "@ant-design/icons";
import CustomText from "../ui/CustomText";
import CustomInput from "../ui/CustomInput";
import CustomDate from "../ui/CustomDate";
import { formatDate } from "../../constants/constants";
import CustomSelect from "../ui/CustomSelect";
const Profile = () => {
    const { profile, users, userId, isLoading } = useSelector(state => state.user);
    const token = Cookies.get("token");
    const dispatch = useDispatch();
    const [editprofileInput, setEditProfileInput] = useState({
        name: "",
        location: "",
        dob: "",
        email: "",
        mobile: "",
        maritalStatus: "",
        gender: "",
        language: ""
    })
    const [editProfileKey, setEditProfileKey] = useState({
        name: false,
        location: false,
        dob: false,
        email: false,
        mobile: false,
        maritalStatus: false,
        gender: false,
        language: false
    })

    const editProfileKeyHandler = (key) => {
        setEditProfileKey({ ...editProfileKey, [key]: true })
    }
    const getProfileHandler = async () => {
        try {
            const res = await dispatch(getProfile({ token })).unwrap();
            console.log(res, "fdsgfjhdsjh");
            setEditProfileInput(res.user)


        } catch (error) {
            console.log(error);

        }
    }
    const updateProfileHandler = async (key) => {
        console.log(key, "key");

        const data = {
            [key]: key == "name" && editprofileInput.name || key == "location" && editprofileInput.location || key == "dob" && editprofileInput.dob || key == "email" && editprofileInput.email 
                  || key == "mobile" && editprofileInput.mobile
                  || key == "maritalStatus" && editprofileInput.maritalStatus
                  || key == "gender" && editprofileInput.gender
                  || key == "language" && editprofileInput.language
        }
        try {
            const response = await dispatch(updateProfileAsync({ data, userId, token })).unwrap();
            if (response.success) {
                getProfileHandler();
                setEditProfileKey({ ...editProfileKey, [key]: false })
            }
        } catch (error) {

        }
    }
    const editProfile = async (e, field) => {
        debugger
        console.log(field, "field");

        try {
            const file = e.target.files[0];

            const formdata = new FormData()
            formdata.append("file", file);


            const res = await dispatch(sendMediaFileAsync({ formdata })).unwrap();
            if (res.success) {
                const data = {
                    [field]: res.url
                }
                const response = await dispatch(updateProfileAsync({ data, userId, token })).unwrap();
                console.log(response);
                if (response.success) {
                    getProfileHandler()
                }

            }

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getProfileHandler()
    }, [])


    return (
        <div className="min-h-screen py-8 px-4">
            <Card className=" mx-auto rounded-2xl  p-0">
                {/* Cover Image */}
                <div className={`relative ${!profile.cover && "bg-[#9D6638] h-[300px]"}`}>
                    <div className="relative">
                        {profile.cover && <img
                            src={profile.cover}
                            alt="cover"
                            className="w-full h-60 object-cover"
                        />}
                        <div className="absolute top-2 right-4">
                            <label
                                htmlFor="cover-upload"
                                style={{
                                    cursor: "pointer"
                                }}
                            >
                                <EditOutlined style={{ color: "#fff", fontSize: "18px" }} />

                            </label>

                            <input
                                id="cover-upload"
                                type="file"
                                accept="image/*,video/*"
                                style={{ display: "none" }}
                                onChange={(e) => { editProfile(e, "cover") }}
                            />
                        </div>

                    </div>

                    {/* Avatar */}
                    <div className="absolute -bottom-14 left-0 right-0 flex justify-center">
                        <div className="relative">
                            {isLoading ? <Skeleton.Avatar active={"active"} size={100} shape={"circle"} /> : <Avatar
                                size={120}
                                src={profile.profile}
                                className="border-4 border-white shadow-lg"
                                icon={<UserOutlined />}
                            />}

                            <div className="absolute   bottom-4 right-0 bg-[#9D6638] rounded-full p-1 size-[24px] flex justify-center items-center">
                                <label
                                    htmlFor="profile-upload"
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >
                                    <EditOutlined style={{ color: "#fff", fontSize: "14px" }} />

                                </label>

                                <input
                                    id="profile-upload"
                                    type="file"
                                    accept="image/*,video/*"
                                    style={{ display: "none" }}
                                    onChange={(e) => { editProfile(e, "profile") }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-20 px-8 pb-8">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">
                        {!editProfileKey.name ?
                            (<div>
                                <Title level={2} className="!mb-1">
                                    {profile?.name}
                                </Title>
                            </div>) :
                            (
                                <CustomInput value={editprofileInput.name} name="name" onchange={(e) => { setEditProfileInput({ ...editprofileInput, name: e.target.value }) }} />
                            )
                        }

                        {!editProfileKey.name ? <Button
                            onClick={() => editProfileKeyHandler("name")}
                            type="text"
                        ><EditOutlined />
                        </Button> :
                            <Button
                                onClick={() => updateProfileHandler("name")}
                                type="text"
                            ><CheckOutlined />
                            </Button>}
                    </div>
                    <Divider />

                    <div className="space-y-8">

                        {/* Location */}
                        <div className="flex justify-between gap-3 items-start">
                            <div className="flex gap-4 min-w-[150px] items-center  ">
                                <EnvironmentOutlined className="text-2xl text-gray-500 mt-1" />
                                <div>
                                    <Title level={5} className="!mb-0">
                                        Location
                                    </Title>
                                    {!editProfileKey.location ?
                                        (<div>
                                            <Text type="secondary">{profile?.location ?? "-"}</Text>
                                        </div>) :
                                        (
                                            <CustomInput value={editprofileInput.location} name="location" onchange={(e) => { setEditProfileInput({ ...editprofileInput, location: e.target.value }) }} />
                                        )
                                    }
                                </div>
                            </div>
                            {!editProfileKey.location ? <Button
                                onClick={() => editProfileKeyHandler("location")}
                                type="text"
                            ><EditOutlined />
                            </Button> :
                                <Button
                                    onClick={() => updateProfileHandler("location")}
                                    type="text"
                                ><CheckOutlined />
                                </Button>}
                        </div>

                        <Divider />

                        {/* Date of Birth */}
                       <div className="flex justify-between gap-3 items-start">
                            <div className="flex gap-4 min-w-[150px] items-center  ">
                                <CalendarOutlined className="text-2xl text-gray-500 mt-1" />
                                <div>
                                    <Title level={5} className="!mb-0">
                                        Date Of Birth
                                    </Title>
                                    {!editProfileKey.dob ?
                                        (<div>
                                            <Text type="secondary">{formatDate(profile?.dob) ?? "-"}</Text>
                                        </div>) :
                                        (
                                            // <CustomInput value={editprofileInput.location} name="location" onchange={(e) => { setEditProfileInput({ ...editprofileInput, location: e.target.value }) }} />
                                          <CustomDate value={editprofileInput.dob} onchange={(e) => { setEditProfileInput({ ...editprofileInput, dob: e}) }}/>
                                        )
                                    }
                                </div>
                            </div>
                            {!editProfileKey.dob ? <Button
                                onClick={() => editProfileKeyHandler("dob")}
                                type="text"
                            ><EditOutlined />
                            </Button> :
                                <Button
                                    onClick={() => updateProfileHandler("dob")}
                                    type="text"
                                ><CheckOutlined />
                                </Button>}
                                </div>

                        <Divider />
                         <div className="flex justify-between gap-3 items-start">
                            <div className="flex gap-4 min-w-[150px] items-center  ">
                                <MailOutlined className="text-2xl text-gray-500 mt-1" />
                                <div>
                                    <Title level={5} className="!mb-0">
                                      Email
                                    </Title>
                                    {!editProfileKey.email ?
                                        (<div>
                                            <Text type="secondary">{profile?.email ?? "-"}</Text>
                                        </div>) :
                                        (
                                            <CustomInput value={editprofileInput.email} name="email" onchange={(e) => { setEditProfileInput({ ...editprofileInput, email: e.target.value }) }} />
                                        )
                                    }
                                </div>
                            </div>
                            {!editProfileKey.email ? <Button
                                onClick={() => editProfileKeyHandler("email")}
                                type="text"
                            ><EditOutlined />
                            </Button> :
                                <Button
                                    onClick={() => updateProfileHandler("email")}
                                    type="text"
                                ><CheckOutlined />
                                </Button>}
                                </div>

                        <Divider />
                       <div className="flex justify-between gap-3 items-start">
                            <div className="flex gap-4 min-w-[150px] items-center  ">
                                <MessageOutlined className="text-2xl text-gray-500 mt-1" />
                                <div>
                                    <Title level={5} className="!mb-0">
                                      Phone Number
                                    </Title>
                                    {!editProfileKey.mobile ?
                                        (<div>
                                            <Text type="secondary">{profile?.mobile ?? "-"}</Text>
                                        </div>)
                                         :
                                        (
                                         <CustomInput value={editprofileInput.mobile} name="email" onchange={(e) => { setEditProfileInput({ ...editprofileInput, mobile: e.target.value }) }} />
                                        )
                                    }
                                </div>
                            </div>
                            {!editProfileKey.mobile ? <Button
                                onClick={() => editProfileKeyHandler("mobile")}
                                type="text"
                            ><EditOutlined />
                            </Button> :
                                <Button
                                    onClick={() => updateProfileHandler("mobile")}
                                    type="text"
                                ><CheckOutlined />
                                </Button>}
                                </div>

                        <Divider />

                 

           <div className="flex justify-between gap-3 items-start">
                            <div className="flex gap-4 min-w-[150px] items-center  ">
                                <HeartOutlined className="text-2xl text-gray-500 mt-1" />
                                <div>
                                    <Title level={5} className="!mb-0">
                                     Marital Status
                                    </Title>
                                    {!editProfileKey.maritalStatus ?
                                        (<div>
                                            <Text type="secondary">{profile?.maritalStatus ?? "-"}</Text>
                                        </div>)
                                         :
                                        (
                                     <CustomSelect value={editprofileInput.maritalStatus} className="w-[200px]" options={[{label:"Single",value:"Single"},{label:"Married",value:"Married"}]}   onchange={(e) => { setEditProfileInput({ ...editprofileInput, maritalStatus: e }) }}/>   

                                        )
                                    }
                                </div>
                            </div>
                            {!editProfileKey.maritalStatus ? <Button
                                onClick={() => editProfileKeyHandler("maritalStatus")}
                                type="text"
                            ><EditOutlined />
                            </Button> :
                                <Button
                                    onClick={() => updateProfileHandler("maritalStatus")}
                                    type="text"
                                ><CheckOutlined />
                                </Button>}
                                </div>

                        <Divider />



                        {/* Gender */}
                          <div className="flex justify-between gap-3 items-start">
                            <div className="flex gap-4 min-w-[150px] items-center  ">
                                <ManOutlined className="text-2xl text-gray-500 mt-1" />
                                <div>
                                    <Title level={5} className="!mb-0">
                                    Gender
                                    </Title>
                                    {!editProfileKey.gender ?
                                        (<div>
                                            <Text type="secondary">{profile?.gender ?? "-"}</Text>
                                        </div>)
                                         :
                                        (
                                     <CustomSelect value={editprofileInput.gender} className="w-[200px]" options={[{label:"Male",value:"Male"},{label:"Female",value:"Female"}]}   onchange={(e) => { setEditProfileInput({ ...editprofileInput, gender: e }) }}/>   

                                        )
                                    }
                                </div>
                            </div>
                            {!editProfileKey.gender ? <Button
                                onClick={() => editProfileKeyHandler("gender")}
                                type="text"
                            ><EditOutlined />
                            </Button> :
                                <Button
                                    onClick={() => updateProfileHandler("gender")}
                                    type="text"
                                ><CheckOutlined />
                                </Button>}
                                </div>


                        <Divider />

                        {/* Languages */}
                          <div className="flex justify-between gap-3 items-start">
                            <div className="flex gap-4 min-w-[150px] items-center  ">
                                <GlobalOutlined className="text-2xl text-gray-500 mt-1" />
                                <div>
                                    <Title level={5} className="!mb-0">
                                    Language
                                    </Title>
                                    {!editProfileKey.language ?
                                        (<div>
                                            <Text type="secondary">{profile?.language ?? "-"}</Text>
                                        </div>)
                                         :
                                        (
                                     <CustomSelect  value={editprofileInput.language} className="w-[200px]" options={[{label:"English",value:"English"},{label:"Hindi",value:"Hindi"}]}   onchange={(e) => { setEditProfileInput({ ...editprofileInput, language: e }) }}/>   

                                        )
                                    }
                                </div>
                            </div>
                            {!editProfileKey.language ? <Button
                                onClick={() => editProfileKeyHandler("language")}
                                type="text"
                            ><EditOutlined />
                            </Button> :
                                <Button
                                    onClick={() => updateProfileHandler("language")}
                                    type="text"
                                ><CheckOutlined />
                                </Button>}
                                </div>

                    </div>

                </div>
            </Card>
        </div>
    );
};

export default Profile;