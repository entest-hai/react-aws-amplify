import {
  AutocompleteInput,
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  List,
  NumberField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  required,
  Show,
  ShowButton,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from "react-admin";
import React from "react";

const DoctorList = (props) => {
    console.log(props)
    console.log({...props})
    return (
    <List {...props}>
      <Datagrid>
        <TextField source={"id"}></TextField>
        <TextField source={"name"}></TextField>
        <TextField source={"address"}></TextField>
        <TextField source={"phone"}></TextField>
        <TextField source={"department"}></TextField>
       <ReferenceField
            label="Hospital"
            source="hospitalID"
            reference="Hospitals">
            <TextField source="name" />
        </ReferenceField>
        <ShowButton></ShowButton>
        <EditButton></EditButton>
      </Datagrid>
    </List>
  );
}

const DoctorShow = (props) => {
  return (
      <Show {...props}>
        <SimpleShowLayout>
          <TextField source={"id"}></TextField>
          <TextField source={"name"}></TextField>
          <TextField source={"phone"}></TextField>
            <TextField source={"department"}></TextField>
          <TextField source={"createdAt"}></TextField>
          <TextField source={"updatedAt"}></TextField>
            <ReferenceField
            label="Hospital"
            source="hospitalID"
            reference="Hospitals">
            <TextField source="name" />
        </ReferenceField>
        </SimpleShowLayout>
      </Show>
  )
}

const DoctorEdit = (props) => {
  return (
      <Edit {...props}>
        <SimpleForm>
          <TextInput source={"id"}></TextInput>
          <TextInput source={"name"}></TextInput>
          <TextInput source={"address"}></TextInput>
          <TextInput source={"phone"}></TextInput>
          <TextInput source={"department"}></TextInput>
          <TextInput source={"hospitalID"}></TextInput>
        </SimpleForm>
      </Edit>
  )
}

const DoctorCreate = (props) => {
  return (
      <Create {...props}>
        <SimpleForm>
          <TextInput source={"id"}></TextInput>
          <TextInput source={"name"}></TextInput>
          <TextInput source={"phone"}></TextInput>
          <TextInput source={"address"}></TextInput>
            <TextInput source={"department"}></TextInput>
          <TextInput source={"hospitalID"}></TextInput>
        </SimpleForm>
      </Create>
  )
}


export {DoctorList, DoctorShow, DoctorCreate, DoctorEdit};