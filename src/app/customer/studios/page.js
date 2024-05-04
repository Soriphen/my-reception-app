"use client";
import StudioList from "./StudioList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import React, { useEffect } from "react";
import { setStudios } from "@/store/features/studios/studiosSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const StudiosPage = () => {
  const dispatch = useAppDispatch();
  const studios = useAppSelector((state) => state.studios);

  useEffect(() => {
    const fetchStudios = async () => {
      const studiosCollectionRef = collection(db, "studios");
      const querySnapshot = await getDocs(studiosCollectionRef);
      const fetchedStudios = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setStudios(fetchedStudios));
    };

    fetchStudios();
  }, []);

  return (
    <div>
      <StudioList studios={studios} />
    </div>
  );
};

export default StudiosPage;
