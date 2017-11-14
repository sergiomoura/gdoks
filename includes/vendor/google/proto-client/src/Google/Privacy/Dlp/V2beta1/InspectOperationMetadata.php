<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: google/privacy/dlp/v2beta1/dlp.proto

namespace Google\Privacy\Dlp\V2beta1;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Metadata returned within GetOperation for an inspect request.
 *
 * Generated from protobuf message <code>google.privacy.dlp.v2beta1.InspectOperationMetadata</code>
 */
class InspectOperationMetadata extends \Google\Protobuf\Internal\Message
{
    /**
     * Total size in bytes that were processed.
     *
     * Generated from protobuf field <code>int64 processed_bytes = 1;</code>
     */
    private $processed_bytes = 0;
    /**
     * Estimate of the number of bytes to process.
     *
     * Generated from protobuf field <code>int64 total_estimated_bytes = 4;</code>
     */
    private $total_estimated_bytes = 0;
    /**
     * Generated from protobuf field <code>repeated .google.privacy.dlp.v2beta1.InfoTypeStatistics info_type_stats = 2;</code>
     */
    private $info_type_stats;
    /**
     * The time which this request was started.
     *
     * Generated from protobuf field <code>.google.protobuf.Timestamp create_time = 3;</code>
     */
    private $create_time = null;
    /**
     * The inspect config used to create the Operation.
     *
     * Generated from protobuf field <code>.google.privacy.dlp.v2beta1.InspectConfig request_inspect_config = 5;</code>
     */
    private $request_inspect_config = null;
    /**
     * The storage config used to create the Operation.
     *
     * Generated from protobuf field <code>.google.privacy.dlp.v2beta1.StorageConfig request_storage_config = 6;</code>
     */
    private $request_storage_config = null;
    /**
     * Optional location to store findings.
     *
     * Generated from protobuf field <code>.google.privacy.dlp.v2beta1.OutputStorageConfig request_output_config = 7;</code>
     */
    private $request_output_config = null;

    public function __construct() {
        \GPBMetadata\Google\Privacy\Dlp\V2Beta1\Dlp::initOnce();
        parent::__construct();
    }

    /**
     * Total size in bytes that were processed.
     *
     * Generated from protobuf field <code>int64 processed_bytes = 1;</code>
     * @return int|string
     */
    public function getProcessedBytes()
    {
        return $this->processed_bytes;
    }

    /**
     * Total size in bytes that were processed.
     *
     * Generated from protobuf field <code>int64 processed_bytes = 1;</code>
     * @param int|string $var
     * @return $this
     */
    public function setProcessedBytes($var)
    {
        GPBUtil::checkInt64($var);
        $this->processed_bytes = $var;

        return $this;
    }

    /**
     * Estimate of the number of bytes to process.
     *
     * Generated from protobuf field <code>int64 total_estimated_bytes = 4;</code>
     * @return int|string
     */
    public function getTotalEstimatedBytes()
    {
        return $this->total_estimated_bytes;
    }

    /**
     * Estimate of the number of bytes to process.
     *
     * Generated from protobuf field <code>int64 total_estimated_bytes = 4;</code>
     * @param int|string $var
     * @return $this
     */
    public function setTotalEstimatedBytes($var)
    {
        GPBUtil::checkInt64($var);
        $this->total_estimated_bytes = $var;

        return $this;
    }

    /**
     * Generated from protobuf field <code>repeated .google.privacy.dlp.v2beta1.InfoTypeStatistics info_type_stats = 2;</code>
     * @return \Google\Protobuf\Internal\RepeatedField
     */
    public function getInfoTypeStats()
    {
        return $this->info_type_stats;
    }

    /**
     * Generated from protobuf field <code>repeated .google.privacy.dlp.v2beta1.InfoTypeStatistics info_type_stats = 2;</code>
     * @param \Google\Privacy\Dlp\V2beta1\InfoTypeStatistics[]|\Google\Protobuf\Internal\RepeatedField $var
     * @return $this
     */
    public function setInfoTypeStats($var)
    {
        $arr = GPBUtil::checkRepeatedField($var, \Google\Protobuf\Internal\GPBType::MESSAGE, \Google\Privacy\Dlp\V2beta1\InfoTypeStatistics::class);
        $this->info_type_stats = $arr;

        return $this;
    }

    /**
     * The time which this request was started.
     *
     * Generated from protobuf field <code>.google.protobuf.Timestamp create_time = 3;</code>
     * @return \Google\Protobuf\Timestamp
     */
    public function getCreateTime()
    {
        return $this->create_time;
    }

    /**
     * The time which this request was started.
     *
     * Generated from protobuf field <code>.google.protobuf.Timestamp create_time = 3;</code>
     * @param \Google\Protobuf\Timestamp $var
     * @return $this
     */
    public function setCreateTime($var)
    {
        GPBUtil::checkMessage($var, \Google\Protobuf\Timestamp::class);
        $this->create_time = $var;

        return $this;
    }

    /**
     * The inspect config used to create the Operation.
     *
     * Generated from protobuf field <code>.google.privacy.dlp.v2beta1.InspectConfig request_inspect_config = 5;</code>
     * @return \Google\Privacy\Dlp\V2beta1\InspectConfig
     */
    public function getRequestInspectConfig()
    {
        return $this->request_inspect_config;
    }

    /**
     * The inspect config used to create the Operation.
     *
     * Generated from protobuf field <code>.google.privacy.dlp.v2beta1.InspectConfig request_inspect_config = 5;</code>
     * @param \Google\Privacy\Dlp\V2beta1\InspectConfig $var
     * @return $this
     */
    public function setRequestInspectConfig($var)
    {
        GPBUtil::checkMessage($var, \Google\Privacy\Dlp\V2beta1\InspectConfig::class);
        $this->request_inspect_config = $var;

        return $this;
    }

    /**
     * The storage config used to create the Operation.
     *
     * Generated from protobuf field <code>.google.privacy.dlp.v2beta1.StorageConfig request_storage_config = 6;</code>
     * @return \Google\Privacy\Dlp\V2beta1\StorageConfig
     */
    public function getRequestStorageConfig()
    {
        return $this->request_storage_config;
    }

    /**
     * The storage config used to create the Operation.
     *
     * Generated from protobuf field <code>.google.privacy.dlp.v2beta1.StorageConfig request_storage_config = 6;</code>
     * @param \Google\Privacy\Dlp\V2beta1\StorageConfig $var
     * @return $this
     */
    public function setRequestStorageConfig($var)
    {
        GPBUtil::checkMessage($var, \Google\Privacy\Dlp\V2beta1\StorageConfig::class);
        $this->request_storage_config = $var;

        return $this;
    }

    /**
     * Optional location to store findings.
     *
     * Generated from protobuf field <code>.google.privacy.dlp.v2beta1.OutputStorageConfig request_output_config = 7;</code>
     * @return \Google\Privacy\Dlp\V2beta1\OutputStorageConfig
     */
    public function getRequestOutputConfig()
    {
        return $this->request_output_config;
    }

    /**
     * Optional location to store findings.
     *
     * Generated from protobuf field <code>.google.privacy.dlp.v2beta1.OutputStorageConfig request_output_config = 7;</code>
     * @param \Google\Privacy\Dlp\V2beta1\OutputStorageConfig $var
     * @return $this
     */
    public function setRequestOutputConfig($var)
    {
        GPBUtil::checkMessage($var, \Google\Privacy\Dlp\V2beta1\OutputStorageConfig::class);
        $this->request_output_config = $var;

        return $this;
    }

}

