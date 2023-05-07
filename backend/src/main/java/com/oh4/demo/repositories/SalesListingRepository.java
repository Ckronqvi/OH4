package com.oh4.demo.repositories;

import com.oh4.demo.entities.SalesListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesListingRepository extends JpaRepository<SalesListing, Long> {

}
