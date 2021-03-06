import {
  Create,
  Datagrid,
  DateField,
  Edit,
  EditButton,
  List,
  Show,
  ShowButton,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from "react-admin";
import React from "react";

const HospitalList = (props) => {

    return (
    <List {...props}> s3:
      <Datagrid>
        <TextField source={"id"}></TextField>
        <TextField source={"name"}></TextField>
        <TextField source={"address"}></TextField>
        <TextField source={"phone"}></TextField>
        <ShowButton></ShowButton>
        <EditButton></EditButton>
      </Datagrid>
    </List>
  );
}


const HospitalShow = (props) => {
    // console.log(props)
    return (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source={"id"}></TextField>
                <TextField source={"name"}></TextField>
                <TextField source={"phone"}></TextField>
                <TextField source={"address"}></TextField>
                <DateField source={"createdAt"}></DateField>
                <DateField source={"updatedAt"}></DateField>
            </SimpleShowLayout>
        </Show>
    )
}

const HospitalEdit = (props) => {
    return (
        <Edit
            {...props}
            // transform={(data) => {
            //   const { ordersByDate, ordersByStatusDate, ...rest } = data;
            //   return rest;
            // }}
        >
        <SimpleForm>
          <TextInput source="id" disabled />
          <TextInput source="name"/>
          <TextInput source={"address"} />
          <TextInput source="phone" />
        </SimpleForm>
      </Edit>
    )
}

const HospitalCreate = (props) => {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source={"id"}></TextInput>
                <TextInput source={"name"}></TextInput>
                <TextInput source={"phone"}></TextInput>
                <TextInput source={"address"}></TextInput>
            </SimpleForm>
        </Create>
    )
}


export {HospitalList, HospitalShow, HospitalEdit, HospitalCreate};