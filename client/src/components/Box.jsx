import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import PropTypes from "prop-types";

function Box({ dimensions, color }) {
  const mesh = useRef();

  console.log("Dimensions received in Box:", dimensions);

  const { width, depth, height } = dimensions;

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={mesh} scale={[width, height, depth]}>
      <boxGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

Box.propTypes = {
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    depth: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  color: PropTypes.string.isRequired,
};

export default Box;