import { useState, useEffect } from "react";
import SelectList from "react-native-dropdown-select-list";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView, Button, Image } from "react-native";
import { useRef } from "react";
import { Camera } from "expo-camera";
import { showMessage } from "react-native-flash-message";
import { StatusBar } from "expo-status-bar";

export default function MemberPage() {
  const [selectedMember, setSelectedMember] = useState("");
  const [memberData, setMemberData] = useState({});
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState();
  const [showCamera, setShowCamera] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [selectedDep, setSelectedDep] = useState("");

  const [dependantData, setDependantData] = useState({});

  // useEffect(
  //   () =>
  //Get Values from database
  //     axios
  //       .get(
  //         "https://cargoshakti.com/clubtrakkapi/api/member/get-member-bycode/{p_MemberCode}"
  //       )
  //       .then((response) => {
  //         // Store Values in Temporary Array
  //         let newArray = response.data.map((item) => {
  //           return { key: item.MemberCode, value: item.MemberName };
  //         });
  //         //Set Data Variable
  //         setData(newArray);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       }),
  //   []
  // );

  //capture member photo
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  //dropdownlist to display member details
  let response = [
    {
      id: 100,
      memberId: 420,
      memberCode: "CNMA004-02",
      memberName: "JOHN HENRY",
      memberType: "",
      smartCardNo: "",
      dob: "1967-08-18T00:00:00",
      emailId: "",
      mobileNo: "",
      validFrom: "2022-04-01T00:00:00",
      validTo: "1900-01-01T00:00:00",
      isActive: 1,
      refId: null,
    },
    {
      id: 101,
      memberId: 421,
      memberCode: "CNMA004-02",
      memberName: "HARRIS JOHN",
      memberType: "",
      smartCardNo: "",
      dob: "1967-08-18T00:00:00",
      emailId: "",
      mobileNo: "",
      validFrom: "2022-04-01T00:00:00",
      validTo: "1900-01-01T00:00:00",
      isActive: 1,
      refId: null,
    },
  ];

  let dropdownData = response.map(function (res) {
    return { key: res.id, value: res.memberName };
  });

  let displayMemberData = (memberId) => {
    const data = response.filter((item) => item.id == memberId);
    if (data.length == 0) {
      return;
    }

    setMemberData(data[0]);
    console.log(data);
  };

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
      startCamera: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let uploadPhoto = () => {
      fetch(
        // TODO: Replace this with the actual URL: "https://cargoshakti.com/clubtrakkapi/api/member/save-member-photo"
        "https://a9a6f834-e0a2-412f-9a01-cf26e313d3dc.mock.pstmn.io/api/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            MemberId: 123,
            Photo: photo.base64,
          }),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          showMessage({
            message: "Photo Upload is successful",
            type: "success",
          });
        });
    };

    //display dependant list

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <View style={styles.buttonContainer}>
          <Button style={styles.button} title="Upload" onPress={uploadPhoto} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            title="Capture again"
            onPress={() => setPhoto(undefined)}
          />
        </View>
      </SafeAreaView>
    );
  }

  let responseDep = [
    {
      id: 199,
      dependantId: 420,
      dependantCode: "CNMA004-02",
      dependantName: "SANGEETA SRISRIMAL",
      dependantType: "",
      smartCardNo: "",
      dob: "1967-08-18T00:00:00",
      emailId: "",
      mobileNo: "",
      validFrom: "2022-04-01T00:00:00",
      validTo: "1900-01-01T00:00:00",
      isActive: 1,
      refId: null,
    },
    {
      id: 200,
      dependantId: 420,
      dependantCode: "CNMA004-02",
      dependantName: "ALEX JOHN",
      dependantType: "",
      smartCardNo: "",
      dob: "1967-08-18T00:00:00",
      emailId: "",
      mobileNo: "",
      validFrom: "2022-04-01T00:00:00",
      validTo: "1900-01-01T00:00:00",
      isActive: 1,
      refId: null,
    },
  ];

  let dropdownDataDep = responseDep.map(function (res) {
    return { key: res.id, value: res.dependantName };
  });

  let displayDependantData = (dependantId) => {
    const dataDep = responseDep.filter((item) => item.id == dependantId);
    if (dataDep.length == 0) {
      return;
    }

    setDependantData(dataDep[0]);
    console.log(dataDep);
  };

  return (
    //display member list
    <View style={styles.dropdownlist}>
      <SelectList
        setSelected={setSelectedMember}
        data={dropdownData}
        onSelect={() => displayMemberData(selectedMember)}
        placeholder="Select member ID"
      />
      <View style={styles.memberDetails}>
        <Text>Member Code: {memberData.memberCode}</Text>
        <Text>Member Name: {memberData.memberName}</Text>
        <Text>Member Type: {memberData.memberType}</Text>
      </View>

      <View style={styles.dropdownlist}>
        <SelectList
          setSelected={setSelectedDep}
          data={dropdownDataDep}
          onSelect={() => displayDependantData(selectedDep)}
          placeholder="Select Dependant ID"
        />
        <View style={styles.dependantDetails}>
          <Text>Dependant Code: {dependantData.dependantCode}</Text>
          <Text>Dependant Name: {dependantData.dependantName}</Text>
          <Text>Dependant Type: {dependantData.dependantType}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Take member Photo"
          onPress={takePic}
        />
      </View>
      <Camera
        style={styles.container}
        ref={cameraRef}
        flashMode={Camera.Constants.FlashMode.on}
        type={type}
      >
        <Button
          icon="axis-z-rotate-clockwise"
          style={{ marginRight: 12 }}
          title="front"
          mode="outlined"
          color="gray"
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          {type === Camera.Constants.Type.back ? "Front" : "Back "}
        </Button>
        <StatusBar style="auto" />
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownlist: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    flex: 1,
  },
  memberDetails: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    // height: 200,
    // width: 200,
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
  },
  buttonContainer: {
    backgroundColor: "blue",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    width: 185,
    margin: 30,
  },
  preview: {
    alignSelf: "stretch",
    // flex: 1,
    height: 120,
    width: 120,
    marginLeft: 130,
    marginBottom: 6,
  },
});
