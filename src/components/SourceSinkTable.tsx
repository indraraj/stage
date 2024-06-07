import { ArrowDownIcon } from "@chakra-ui/icons";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Stack,
  Icon,
  Tbody,
  Td,
  Badge,
  Text,
  Tooltip,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
} from "@chakra-ui/react";
import React from "react";
import { MdArrowDownward, MdOutlineMoreVert } from "react-icons/md";
import { CustomTd } from "../utils/chakraUtils";
import {
  DestinationApiResponse,
  Source,
  SourceApiResponse,
  deleteResource,
} from "../utils/apis";
import { BsTags } from "react-icons/bs";
import ConnectorImage from "./ConnectorImage";
import { getConnectorTypeName } from "../utils/helpers";

interface SourceSinkTableProps {
  tableType: "source" | "destination";
  data: SourceApiResponse | DestinationApiResponse;
}

const SourceSinkTable: React.FC<SourceSinkTableProps> = ({
  data,
  tableType,
}) => {
  const handleDelete = async (id: number, type: string) => {
    const resourceType = type === "source" ? "sources" : "destinations";
    const url = `/api/${resourceType}/${id}`;
    const result = await deleteResource(url);

    if (result.error) {
      console.error(result.error);
    } else {
      console.log("Resource deleted successfully", result.data);
    }
  };

  const onDeleteHandler = (id: number) => {
    handleDelete(id, tableType);
  };
  return (
    <TableContainer
      bg="white"
      borderRadius="lg"
      p="2"
      border="1px"
      borderColor="gray.200"
    >
      <Table variant="simple">
        <TableCaption>{`List of configured active ${tableType}.`}</TableCaption>
        <Thead>
          <Tr>
            <Th>
              <Stack direction="row" align="center" spacing={2}>
                <Text fontSize="xm">Name</Text>
                <Icon boxSize="4" as={MdArrowDownward} />
              </Stack>
            </Th>
            <Th>Type</Th>
            <Th>
              <Stack direction="row" align="center" spacing={2}>
                <Text fontSize="xm">Active</Text>
                <Icon boxSize="4" as={ArrowDownIcon} />
              </Stack>
            </Th>
            <Th isNumeric></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((instance: Source) => (
            <Tr key={instance.id}>
              <Td>{instance.name}</Td>
              <CustomTd>
                <Stack direction="row" align="center" spacing={2}>
                  <ConnectorImage connectorType={instance.type} size={8} />
                  <Text fontSize="md">
                    {getConnectorTypeName(instance.type)}
                  </Text>
                </Stack>
              </CustomTd>
              <Td>
                <Tooltip label={`Used in 0 pipeline`}>
                  <Badge
                    variant="outline"
                    borderRadius="lg"
                    colorScheme="blue"
                    pl="2"
                    pr="2"
                    pt="1"
                    pb="1"
                    cursor="pointer"
                  >
                    <Icon as={BsTags} />
                    &nbsp; 0
                  </Badge>
                </Tooltip>
              </Td>
              <Td isNumeric>
                <Menu>
                  <MenuButton>
                    <MdOutlineMoreVert />
                  </MenuButton>
                  <MenuList>
                    <MenuItem isDisabled>Overview</MenuItem>
                    <MenuItem isDisabled>Edit</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={() => onDeleteHandler(instance.id)}>
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default SourceSinkTable;
