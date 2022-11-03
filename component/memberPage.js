import { useState, useEffect } from "react";
import SelectList from "react-native-dropdown-select-list";
import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export default function MemberPagee({ navigation }) {
  const [selectedMember, setSelectedMember] = useState("");
  const [memberData, setMemberData] = useState({});
  const [selectedDep, setSelectedDep] = useState("");
  const [dependantData, setDependantData] = useState({});

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

  //   let onGoToCamera = () => {
  //     navigation.navigate("Camera");
  //   };

  return (
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
          onPress={() => navigation.navigate("Camerapage")}
        />
      </View>
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
