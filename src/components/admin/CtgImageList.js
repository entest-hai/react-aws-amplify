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

const CtgImageList = (props) => {
    // console.log(props)
    return (
    <List {...props}>
      <Datagrid>
        <TextField source={"id"}></TextField>
        <TextField source={"username"}></TextField>
        <TextField source={"ctgUrl"}></TextField>
          <ShowButton></ShowButton>
          <EditButton></EditButton>
      </Datagrid>
    </List>
  );
}

const CtgImageShow = (props) => {
    return (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source={"id"}></TextField>
                <TextField source={"username"}></TextField>
                <TextField source={"ctgUrl"}></TextField>
                <TextField source={"createdAt"}></TextField>
                <TextField source={"updatedAt"}></TextField>
            </SimpleShowLayout>
        </Show>
    )
}

const CtgImageEdit = (props) => {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput source={"id"}></TextInput>
                <TextInput source={"username"}></TextInput>
                <TextInput source={"ctgUrl"}></TextInput>
            </SimpleForm>
        </Edit>
    )
}

const CtgImageCreate = (props) => {
    return (
        <Create {...props}>
            <SimpleForm>
                 <TextInput source={"id"}></TextInput>
                <TextInput source={"username"}></TextInput>
                <TextInput source={"ctgUrl"}></TextInput>
            </SimpleForm>
        </Create>
    )
}

export {CtgImageList, CtgImageCreate, CtgImageShow, CtgImageEdit};