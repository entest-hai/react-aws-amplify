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

const PatientList = (props) => {
    return (
    <List {...props}>
      <Datagrid>
        <TextField source={"id"}></TextField>
        <TextField source={"name"}></TextField>
        <TextField source={"address"}></TextField>
        <TextField source={"phone"}></TextField>
        <ReferenceField
            label="Doctor"
            source="doctorID"
            reference="Doctors">
            <TextField source="name" />
        </ReferenceField>
        <ShowButton></ShowButton>
        <EditButton></EditButton>
      </Datagrid>
    </List>
  );
}

const PatientShow = (props) => {
    return (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source={"id"}></TextField>
                <TextField source={"name"}></TextField>
                <TextField source={"phone"}></TextField>
                <TextField source={"address"}></TextField>
                <TextField source={"doctorID"}></TextField>
                <TextField source={"createdAt"}></TextField>
                <TextField source={"updatedAt"}></TextField>
                <ReferenceField
                    label="Doctor"
                    source="doctorID"
                    reference="Doctors">
                    <TextField source="name" />
                </ReferenceField>
            </SimpleShowLayout>
        </Show>
    )
}

const PatientEdit = (props) => {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput source={"id"}></TextInput>
                <TextInput source={"name"}></TextInput>
                <TextInput source={"phone"}></TextInput>
                <TextInput source={"address"}></TextInput>
                <TextInput source={"doctorID"}></TextInput>
            </SimpleForm>
        </Edit>
    )
}

const PatientCreate = (props) => {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source={"id"}></TextInput>
                <TextInput source={"name"}></TextInput>
                <TextInput source={"phone"}></TextInput>
                <TextInput source={"address"}></TextInput>
                <TextInput source={"doctorID"}></TextInput>
            </SimpleForm>
        </Create>
    )
}




export {PatientList, PatientShow, PatientEdit, PatientCreate};